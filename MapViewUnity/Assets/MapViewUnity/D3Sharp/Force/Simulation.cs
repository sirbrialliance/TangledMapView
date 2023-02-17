using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Timers;

namespace D3Sharp.Force
{
    public delegate double ForceDelegate<T>(T t = default, int i = 0, IList<T> list = null);

    public enum SimulationState
    {
        Starting = 0,
        BeforeTick = 2,
        Ticked = 4,
        Stopping = 6,
        End = 8
    }

    public class SimulationEventArgs : EventArgs
    {
        public SimulationState State { get; }

        public SimulationEventArgs(SimulationState state)
        {
            this.State = state;
        }
    }

    public class Simulation<TNode> : IDisposable where TNode : INode
    {
        #region fields
        Dictionary<string, Force<TNode>> _forces;
        IList<TNode> _nodes;
        IRandom _randomSource;

        EventLoop stepper;
        double initialCx;
        double initialCy;
        double initialRadius;
        double initialAngle;

        double velocityDecayReve = 0.6;
        double actualAlpha = 1;
        double _alpha = 1;//save the use settings , restore for start

        public double Alpha
        {
            get => _alpha;
            set
            {
                this._alpha = value;
                this.actualAlpha = value;
            }
        }
        public double ActualAlpha => actualAlpha;
        public double AlphaMin { get; set; } = 0.001;
        public double AlphaDecay { get; set; }
        public double AlphaTarget { get; set; } = 0;
        public event EventHandler<SimulationEventArgs> Events;
        #endregion

        #region properties
        public IRandom RandomSource
        {
            get => this._randomSource;
            set
            {
                if (value == null)
                    return;
                this._randomSource = value;
                initializeForces();
            }
        }
        public IList<TNode> Nodes
        {
            get => this._nodes;
            set
            {
                this._nodes = value;
                initializeNodes();
                initializeForces();
            }
        }
        public double VelocityDecay
        {
            get => 1 - velocityDecayReve;
            set
            {
                this.velocityDecayReve = 1 - value;
            }
        }
        public int Interval
        {
            get => stepper.Interval;
            set => stepper.Interval = value;
        }
        #endregion

        #region Constructors
        public Simulation(List<TNode> nodes = null, IRandom random = null,
            double initialCx = 0, double initialCy = 0,
            double initialRadius = 10, double initialAngle = double.NaN,
            int interval = 5)
        {
            this.initialCx = initialCx;
            this.initialCy = initialCy;
            this.initialRadius = initialRadius;
            this.initialAngle = double.IsNaN(initialAngle) ?
                Math.PI * (3 - Math.Sqrt(5)) : initialAngle;

            AlphaDecay = 1 - Math.Pow(AlphaMin, 1d / 300);
            stepper = new EventLoop(interval);
            stepper.Events += step;
            _forces = new Dictionary<string, Force<TNode>>();
            this._randomSource = random ?? new Lcg();
            this._nodes = nodes ?? new List<TNode>();
            initializeNodes();
        }
        #endregion

        public TNode Find(double x, double y, double radius = double.NaN)
        {
            double dx, dy, d2;
            TNode node;
            TNode closest = default;
            if (double.IsNaN(radius))
                radius = double.PositiveInfinity;
            else
                radius *= radius;
            for (int i = 0; i < Nodes.Count; i++)
            {
                node = Nodes[i];
                dx = x - node.X;
                dy = y - node.Y;
                d2 = dx * dx + dy * dy;
                if (d2 < radius)
                {
                    closest = node;
                    radius = d2;
                }
            }
            return closest;
        }

        #region initializes
        private void initializeNodes()
        {
            if (Nodes.IsNullOrEmpty())
                return;
            TNode node;
            for (int i = 0, n = Nodes.Count; i < n; ++i)
            {
                node = Nodes[i];
                node.Index = i;
                if (!double.IsNaN(node.Fx)) node.X = node.Fx;
                if (!double.IsNaN(node.Fy)) node.Y = node.Fy;
                if (double.IsNaN(node.X) || double.IsNaN(node.Y))
                {
                    var radius = initialRadius * Math.Sqrt(0.5 + i);
                    var angle = i * initialAngle;
                    node.X = radius * Math.Cos(angle) + initialCx;
                    node.Y = radius * Math.Sin(angle) + initialCy;
                }
                if (double.IsNaN(node.Vx) || double.IsNaN(node.Vy))
                {
                    node.Vx = node.Vy = 0;
                }
            }
        }

        private Force<TNode> initializeForce(Force<TNode> force)
        {
            force?.Initialize(Nodes, RandomSource);
            return force;
        }

        private void initializeForces()
        {
            foreach (var item in _forces.Values)
            {
                initializeForce(item);
            }
        }
        #endregion

        #region setters
        public Simulation<TNode> SetVelocityDecay(double velocityDecay)
        {
            this.VelocityDecay = velocityDecay;
            return this;
        }
        public Simulation<TNode> SetAlpha(double alpha)
        {
            this.Alpha = alpha;
            return this;
        }
        public Simulation<TNode> SetAlphaMin(double alphaMin)
        {
            this.AlphaMin = alphaMin;
            return this;
        }
        public Simulation<TNode> SetAlphaDecay(double alphaDecay)
        {
            this.AlphaDecay = alphaDecay;
            return this;
        }
        public Simulation<TNode> SetAlphaTarget(double alphaTarget)
        {
            this.AlphaTarget = alphaTarget;
            return this;
        }
        public Simulation<TNode> SetInterval(int interval)
        {
            this.Interval = interval;
            return this;
        }

        public Simulation<TNode> SetNodes(IList<TNode> nodes)
        {
            this.Nodes = nodes;
            return this;
        }
        public Simulation<TNode> SetRandomSource(IRandom randomSource)
        {
            this.RandomSource = randomSource;
            return this;
        }
        #endregion

        #region forces
        public Simulation<TNode> AddForce(string name, Force<TNode> force)
        {
            if (name == null || force == null)
                throw new ArgumentNullException();
            _forces.Add(name, initializeForce(force));
            return this;
        }
        public Simulation<TNode> RemoveForce(string name)
        {
            _forces.Remove(name);
            return this;
        }
        public Force<TNode> GetForce(string name)
        {
            return _forces[name];
        }

        public Force<TNode> this[string name]
        {
            get => _forces.ContainsKey(name) ? _forces[name] : null;
            set => _forces[name] = initializeForce(value);
        }

        #endregion

        #region  events loop 
        private object obj = new object();

        private void step(object sender, EventArgs e)
        {
            //var thread = System.Threading.Thread.CurrentThread;
            //Debug.WriteLine($"Tick start on Thead{{{thread.ManagedThreadId}}}");
            lock (obj)//work one by one
            {
                Events?.Invoke(this, new SimulationEventArgs(SimulationState.BeforeTick));
                Tick();
                Events?.Invoke(this, new SimulationEventArgs(SimulationState.Ticked));
                if (actualAlpha < AlphaMin)
                {
                    Stop();
                    Events?.Invoke(this, new SimulationEventArgs(SimulationState.End));
                }
            }
            //Debug.WriteLine($"Tick stop on Thead{{{thread.ManagedThreadId}}}");
        }

        public Simulation<TNode> Tick(int iterations = 1)
        {
            for (int k = 0; k < iterations; k++)
            {
                actualAlpha += (AlphaTarget - actualAlpha) * AlphaDecay;
                foreach (var force in _forces)
                {
                    force.Value.UseForce(actualAlpha);
                }

                int n = Nodes.Count;
                TNode node;
                for (int i = 0; i < n; i++)
                {
                    node = Nodes[i];
                    if (double.IsNaN(node.Fx))
                        node.X += node.Vx *= velocityDecayReve;
                    else
                    {
                        node.X = node.Fx;
                        node.Vx = 0;
                    }
                    if (double.IsNaN(node.Fy))
                        node.Y += node.Vy *= velocityDecayReve;
                    else
                    {
                        node.Y = node.Fy;
                        node.Vy = 0;
                    }
                }
            }

            return this;
        }

        public Simulation<TNode> Stop()
        {
            Events?.Invoke(this, new SimulationEventArgs(SimulationState.Stopping));
            stepper.Stop();
            return this;
        }

        public Simulation<TNode> Start()
        {
            this.actualAlpha = this._alpha;
            Events?.Invoke(this, new SimulationEventArgs(SimulationState.Starting));
            stepper.Start();
            return this;
        }

        public Simulation<TNode> ResetRandom()
        {
            RandomSource?.Reset();
            return this;
        }

        public Simulation<TNode> On(SimulationState state, Action<Simulation<TNode>> action)
        {
            if (action != null)
            {
                Events += (sender, args) =>
                {
                    if (state == args.State)
                        action?.Invoke(this);
                };
            }
            return this;
        }
        #endregion

        #region dispose
        private bool disposedValue;
        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    this.Events = null;
                    this._randomSource = null;
                    this.obj = null;
                }
                this._nodes = null;
                this._forces = null;
                if (stepper != null)
                {
                    this.stepper.Dispose();
                    this.stepper = null;
                }
                disposedValue = true;
            }
        }

        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
        #endregion
    }
}
