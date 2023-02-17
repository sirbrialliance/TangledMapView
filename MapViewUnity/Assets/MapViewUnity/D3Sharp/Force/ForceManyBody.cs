using System;
using System.Collections.Generic;
using System.Text;

using D3Sharp.QuadTree;

namespace D3Sharp.Force
{
    public class ForceManyBody<TNode> : Force<TNode> where TNode : INode
    {
        #region inner class
        class QtMbNode : QuadNode<TNode>
        {
            public double X { get; set; }
            public double Y { get; set; }
            public double Value { get; set; }
        }
        #endregion

        ForceDelegate<TNode> strength;
        double distanceMin2 = 1;
        double distanceMax2 = double.PositiveInfinity;
        double theta2 = 0.81;
        double[] strengths;
        double alpha;
        TNode node;

        #region Constructors
        public ForceManyBody()
        {
            strength = defaultStrength;
        }
        public ForceManyBody(double strength = -30,
            double distanceMin = 1, double distanceMax = double.NaN,
            double theta = 0.9)
        {
            this.strength = (_, __, ___) => strength;
            this.DistanceMin = distanceMin;
            if (!double.IsNaN(distanceMax))
                this.DistanceMax = distanceMax;
            this.Theta = theta;
        }
        #endregion

        protected override void Initialize()
        {
            if (Nodes.IsNullOrEmpty())
                return;
            int n = Nodes.Count;
            TNode node;
            strengths = new double[n];
            for (int i = 0; i < n; i++)
            {
                node = Nodes[i];
                strengths[node.Index] = strength(node, i, Nodes);
            }
        }

        #region func properties
        private double defaultStrength(TNode node, int i, IList<TNode> nodes) => -30;
        public ForceDelegate<TNode> StrengthFunc
        {
            get => this.strength;
            set
            {
                this.strength = value == null ? defaultStrength : value;
                Initialize();
            }
        }
        public ForceManyBody<TNode> SetStrength(double strength)
        {
            this.StrengthFunc = (_, __, ___) => strength;
            return this;
        }
        #endregion

        #region setters
        public double DistanceMin
        {
            get => Math.Sqrt(distanceMin2);
            set => this.distanceMin2 = value * value;
        }
        public double DistanceMax
        {
            get => Math.Sqrt(distanceMax2);
            set => this.distanceMax2 = value * value;
        }
        public double Theta
        {
            get => Math.Sqrt(theta2);
            set => this.theta2 = value * value;
        }
        public ForceManyBody<TNode> SetDistanceMin(double distanceMin2)
        {
            this.DistanceMin = distanceMin2;
            return this;
        }
        public ForceManyBody<TNode> SetDistanceMax(double distanceMax2)
        {
            this.DistanceMax = distanceMax2;
            return this;
        }
        public ForceManyBody<TNode> SetTheta(double theta2)
        {
            this.Theta = theta2;
            return this;
        }
        #endregion

        #region use force
        public override Force<TNode> UseForce(double alpha = 0)
        {
            int n = Nodes.Count;
            var tree = new QuadTree<TNode, QtMbNode>(Nodes).VisitAfter(accumulate);
            this.alpha = alpha;
            for (int i = 0; i < n; i++)
            {
                node = Nodes[i];
                tree.Visit(apply);
            }
            return this;
        }

        private void accumulate(QtMbNode quad, double x0, double y0, double x1, double y1)
        {
            double strength = 0, weight = 0, x, y, c;

            QtMbNode q;
            if (quad.IsLeaf)
            {
                q = quad;
                q.X = q.Data.X;
                q.Y = q.Data.Y;
                do strength += strengths[q.Data.Index];
                while ((q = (QtMbNode)q.Next) != null);
            }
            else
            {
                x = y = 0;
                for (int i = 0; i < 4; i++)
                {
                    if ((q = (QtMbNode)quad[i]) != null && (c = Math.Abs(q.Value)) != 0)
                    {
                        strength += q.Value;
                        weight += c;
                        x += c * q.X;
                        y += c * q.Y;
                    }
                }
                quad.X = x / weight;
                quad.Y = y / weight;
            }
            quad.Value = strength;
        }

        bool apply(QtMbNode quad, double x1, double _, double x2, double __)
        {
            if (double.IsNaN(quad.Value) || quad.Value == 0)
                return true;
            var x = quad.X - node.X;
            var y = quad.Y - node.Y;
            var w = x2 - x1;
            var l = x * x + y * y;
            if (w * w / theta2 < l)
            {
                if (l < distanceMax2)
                {
                    if (x == 0)
                    {
                        x = IRandom.Jiggle(RandomSource);
                        l += x * x;
                    }
                    if (y == 0)
                    {
                        y = IRandom.Jiggle(RandomSource);
                        l += y * y;
                    }
                    if (l < distanceMin2)
                        l = Math.Sqrt(distanceMin2 * l);
                    node.Vx += x * quad.Value * alpha / l;
                    node.Vy += y * quad.Value * alpha / l;
                }
                return true;
            }
            else if (quad.Length > 0 || l >= distanceMax2)
                return false;

            if (!Equals(quad.Data, node) || quad.Next != null)
            {
                if (x == 0)
                {
                    x = IRandom.Jiggle(RandomSource);
                    l += x * x;
                }
                if (y == 0)
                {
                    y = IRandom.Jiggle(RandomSource);
                    l += y * y;
                }
                if (l < distanceMin2) l = Math.Sqrt(distanceMin2 * l);
            }
            do
            {
                if (!Equals(quad.Data, node))
                {
                    w = strengths[quad.Data.Index] * alpha / l;
                    node.Vx += x * w;
                    node.Vy += y * w;
                }
            } while ((quad = (QtMbNode)quad.Next) != null);
            return false;
        }
        #endregion


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                strength = null;
                node = default;
            }
            strengths = null;
            base.Dispose(disposing);
        }

    }
}
