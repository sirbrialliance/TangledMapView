using System;
using System.Collections.Generic;
using System.Text;

using D3Sharp.QuadTree;

namespace D3Sharp.Force
{
    public class ForceCollide<TNode> : Force<TNode> where TNode : INode
    {
        #region inner class
        class QtCNode : QuadTree.QuadNode<TNode>
        {
            public double R { get; set; }
        }
        #endregion

        public double Strength { get; set; } = 1;
        public int Iterations { get; set; } = 1;

        double[] Radii;
        private ForceDelegate<TNode> radiusFunc = null;

        #region Constructors
        public ForceCollide(ForceDelegate<TNode> radiusFunc = null)
        {
            this.radiusFunc = radiusFunc == null ? defaultRadius : radiusFunc;
        }
        public ForceCollide(double radius, double strength = 1, int iterations = 1)
        {
            this.radiusFunc = (_, __, ___) => radius;
            this.Strength = strength;
            this.Iterations = iterations;
        }
        #endregion

        protected override void Initialize()
        {
            if (Nodes == null)
                return;
            var n = Nodes.Count;
            Radii = new double[n];
            TNode node;
            for (int i = 0; i < n; i++)
            {
                node = Nodes[i];
                Radii[node.Index] = RadiusFunc(node, i, Nodes);
            }
        }

        #region func properties
        protected double defaultRadius(TNode node, int i, IList<TNode> nodes) => 1;
        public ForceDelegate<TNode> RadiusFunc
        {
            get => this.radiusFunc;
            set
            {
                this.radiusFunc = value == null ? defaultRadius : value;
                Initialize();
            }
        }
        public ForceCollide<TNode> SetRadius(double radius)
        {
            this.RadiusFunc = (_, __, ___) => radius;
            return this;
        }
        #endregion

        #region setters
        public ForceCollide<TNode> SetStrength(double strength)
        {
            this.Strength = strength;
            return this;
        }
        public ForceCollide<TNode> SetIterations(int iterations)
        {
            this.Iterations = iterations;
            return this;
        }
        #endregion

        #region use force
        double getX(TNode d) => d.X + d.Vx;
        double getY(TNode d) => d.Y + d.Vy;

        private void prepare(QtCNode quad, double x0, double y0, double x1, double y1)
        {
            if (quad.IsLeaf)
            {
                quad.R = Radii[quad.Data.Index];
            }
            else
            {
                quad.R = 0;
                QtCNode child;
                for (int i = 0; i < 4; i++)
                {
                    child = quad[i] as QtCNode;
                    if (child != null && child.R > quad.R)
                        quad.R = child.R;
                }
            }
        }

        public override Force<TNode> UseForce(double alpha = 0)
        {
            int n = Nodes.Count;

            double xi, yi, ri, ri2;
            TNode node;
            QuadTree<TNode, QtCNode> tree;

            for (int k = 0; k < Iterations; k++)
            {
                tree = new QuadTree<TNode, QtCNode>(Nodes, getX, getY)
                    .VisitAfter(prepare);
                for (int i = 0; i < n; i++)
                {
                    node = Nodes[i];
                    ri = Radii[node.Index];
                    ri2 = ri * ri;
                    xi = node.X + node.Vx;
                    yi = node.Y + node.Vy;
                    tree.Visit(apply);
                }
            }

            bool apply(QtCNode quad, double x0, double y0, double x1, double y1)
            {
                double rj = quad.R;
                double r = ri + rj;
                var data = quad.Data;
                if (data != null)
                {
                    if (data.Index > node.Index)
                    {
                        var x = xi - data.X - data.Vx;
                        var y = yi - data.Y - data.Vy;
                        var l = x * x + y * y;
                        if (l < r * r)
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
                            l = (r - (l = Math.Sqrt(l))) / l * Strength;
                            node.Vx += (x *= l) * (r = (rj *= rj) / (ri2 + rj));
                            node.Vy += (y *= l) * r;
                            data.Vx -= x * (r = 1 - r);
                            data.Vy -= y * r;
                        }
                    }
                    return false;
                }
                return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
            }

            return this;
        }
        #endregion

        protected override void Dispose(bool disposing)
        {
            if (disposing)
                radiusFunc = null;
            Radii = null;
            base.Dispose(disposing);
        }
    }
}
