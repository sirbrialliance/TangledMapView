using System;
using System.Collections.Generic;
using System.Text;

namespace D3Sharp.Force
{
    public class ForceLink<TNode, TLink> : Force<TNode>
        where TNode : INode
        where TLink : Link
    {
        private List<TLink> _links;
        private int[] count;
        double[] bias, strengths, distances;

        ForceDelegate<TLink> strength;
        ForceDelegate<TLink> distance;
        public int Iterations { get; set; } = 1;

        #region Constructors
        public ForceLink(List<TLink> links = null)
        {
            this._links = links ?? new List<TLink>();

            strength = defaultStrength;
            distance = defaultDistance;
        }

        public ForceLink(List<TLink> links, int iterations = 1,
            ForceDelegate<TLink> strengthFunc = null,
            ForceDelegate<TLink> distanceFunc = null)
        {
            this._links = links ?? new List<TLink>();
            this.Iterations = iterations;
            this.strength = strengthFunc ?? defaultStrength;
            this.distance = distanceFunc ?? defaultDistance;
        }

        public ForceLink(List<TLink> links, double strength, double distance, int iterations = 1)
        {
            this._links = links ?? new List<TLink>();

            this.strength = (_, __, ___) => strength;
            this.distance = (_, __, ___) => distance;

            this.Iterations = iterations;
        }
        #endregion

        #region initializes
        protected override void Initialize()
        {
            if (Nodes.IsNullOrEmpty())
                return;
            var n = Nodes.Count;
            var m = _links.Count;

            var nodeById = new Dictionary<int, TNode>();
            foreach (var item in Nodes)
            {
                nodeById[item.Index] = item;
            }

            count = new int[n];

            TLink link;
            for (int i = 0; i < m; i++)
            {
                link = _links[i];
                link.Index = i;
                if (link.Source is int)
                    link.Source = find(nodeById, (int)link.Source);
                if (link.Target is int)
                    link.Target = find(nodeById, (int)link.Target);
                var source = (TNode)link.Source;
                var target = (TNode)link.Target;
                count[source.Index] = count[source.Index] + 1;
                count[target.Index] = count[target.Index] + 1;
            }

            bias = new double[m];
            for (int i = 0; i < m; i++)
            {
                link = _links[i];
                var source = (TNode)link.Source;
                var target = (TNode)link.Target;
                bias[i] = (double)count[source.Index] / (count[source.Index] + count[target.Index]);
            }

            strengths = new double[m]; initializeStrength();
            distances = new double[m]; initializeDistance();
        }

        private void initializeStrength()
        {
            if (Nodes.IsNullOrEmpty())
                return;
            for (int i = 0, n = _links.Count; i < n; i++)
            {
                strengths[i] = StrengthFunc(_links[i], i, _links);
            }
        }

        private void initializeDistance()
        {
            if (Nodes.IsNullOrEmpty())
                return;
            for (int i = 0, n = _links.Count; i < n; i++)
            {
                distances[i] = DistanceFunc(_links[i], i, _links);
            }
        }

        private TNode find(Dictionary<int, TNode> map, int nodeId)
        {
            TNode node;
            if (map.TryGetValue(nodeId, out node))
                return node;
            throw new ArgumentOutOfRangeException("Node not found: " + nodeId);
        }
        #endregion

        #region func properties
        private double defaultStrength(TLink link, int i = 0, IList<TLink> links = null)
        {
            return 1d / Math.Min(count[((TNode)link.Source).Index], count[((TNode)link.Target).Index]);
        }
        public ForceDelegate<TLink> StrengthFunc
        {
            get => this.strength;
            set
            {
                this.strength = value == null ? defaultStrength : value;
                initializeStrength();
            }
        }
        public ForceLink<TNode, TLink> SetStrength(double strength)
        {
            this.StrengthFunc = (_, __, ___) => strength;
            return this;
        }

        private double defaultDistance(TLink link, int i = 0, IList<TLink> links = null) => 30;
        public ForceDelegate<TLink> DistanceFunc
        {
            get => this.distance;
            set
            {
                this.distance = value == null ? defaultDistance : value; ;
                initializeDistance();
            }
        }
        public ForceLink<TNode, TLink> SetDistance(double distance)
        {
            this.DistanceFunc = (_, __, ___) => distance;
            return this;
        }
        #endregion

        #region setters
        public List<TLink> Links
        {
            get => _links;
            set
            {
                this._links = value;
                Initialize();
            }
        }
        public ForceLink<TNode, TLink> SetLinks(List<TLink> links)
        {
            this.Links = links;
            return this;
        }
        public ForceLink<TNode, TLink> SetIterations(int iterations)
        {
            this.Iterations = iterations;
            return this;
        }
        #endregion

        public override Force<TNode> UseForce(double alpha = 0)
        {
            for (int k = 0, n = _links.Count; k < Iterations; ++k)
            {
                Link link;
                TNode source, target;
                double x, y, l, b;
                for (int i = 0; i < n; i++)
                {
                    link = Links[i];
                    source = (TNode)link.Source;
                    target = (TNode)link.Target;
                    x = target.X + target.Vx - source.X - source.Vx;
                    if (x == 0)
                        x = IRandom.Jiggle(RandomSource);
                    y = target.Y + target.Vy - source.Y - source.Vy;
                    if (y == 0)
                        y = IRandom.Jiggle(RandomSource);
                    l = Math.Sqrt(x * x + y * y);
                    l = (l - distances[i]) / l * alpha * strengths[i];
                    x *= l; y *= l;
                    target.Vx -= x * (b = bias[i]);
                    target.Vy -= y * b;
                    source.Vx += x * (b = 1 - b);
                    source.Vy += y * b;
                }
            }
            return this;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                strength = null;
                distance = null;
            }
            count = null;
            strengths = null;
            distances = null;
            bias = null;
            _links = null;
            base.Dispose(disposing);
        }
    }
}
