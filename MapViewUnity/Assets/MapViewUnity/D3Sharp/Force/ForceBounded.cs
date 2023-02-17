using System;
using System.Collections.Generic;
using System.Text;

using D3Sharp.QuadTree;

namespace D3Sharp.Force
{
    public class ForceBounded<TNode> : Force<TNode> where TNode : INode
    {
        ForceDelegate<TNode> strengthFunc;
        double[] strengths;

        public double X1 { get; set; } = 0;
        public double X2 { get; set; } = 0;
        public double Y1 { get; set; } = double.PositiveInfinity;
        public double Y2 { get; set; } = double.PositiveInfinity;

        public ForceBounded(double x1 = 0, double y1 = 0,
            double x2 = double.PositiveInfinity,
            double y2 = double.PositiveInfinity)
        {
            SetBound(x1, x2, y1, y2);
            this.strengthFunc = defaultStrength;
        }

        public ForceBounded<TNode> SetBound(double x1, double x2, double y1, double y2)
        {
            this.X1 = x1;
            this.X2 = x2;
            this.Y1 = y1;
            this.Y2 = y2;
            return this;
        }

        #region func properties
        double defaultStrength(TNode node, int i, IList<TNode> nodes) => 1;
        public ForceDelegate<TNode> StrengthFunc
        {
            get => this.strengthFunc;
            set
            {
                this.strengthFunc = value == null ? defaultStrength : value;
                Initialize();
            }
        }
        public ForceBounded<TNode> SetStrength(double strength)
        {
            this.StrengthFunc = (_, __, ___) => strength;
            return this;
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
                strengths[node.Index] = strengthFunc(node, i, Nodes);
            }
        }


        public override Force<TNode> UseForce(double alpha = 0)
        {
            for (int i = 0, n = Nodes.Count; i < n; i++)
            {
                var node = Nodes[i];

                var strength = strengths[i] * alpha;
                if (double.IsNaN(node.Fx))
                {
                    if (node.X < X1)
                    {
                        node.Vx += (X1 - node.X) * strength;
                    }
                    if (node.X > X2)
                    {
                        node.Vx -= (node.X - X2) * strength;
                    }
                }
                if (double.IsNaN(node.Fy))
                {
                    if (node.Y < Y1)
                    {
                        node.Vy += (Y1 - node.Y) * strength;
                    }

                    if (node.Y > Y2)
                    {
                        node.Vy -= (node.Y - Y2) * strength;
                    }

                    //if (yi > Y2)
                    //{
                    //    node.Vy = (2 * Y2 - yi - node.Y);
                    //}
                    //if (yi < Y1)
                    //{
                    //    node.Vy = (Math.Abs(yi) + Y1);
                    //}
                }
            }
            return this;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                strengthFunc = null;
            }
            strengths = null;
            base.Dispose(disposing);
        }
    }
}
