using System;
using System.Collections.Generic;
using System.Text;

namespace D3Sharp.Force
{
    public class ForceCenter<TNode> : Force<TNode> where TNode : INode
    {
        public double Cx { get; set; }
        public double Cy { get; set; }
        public double Strength { get; set; } = 1;

        public ForceCenter(double cx = 0, double cy = 0, double strength = 1)
        {
            this.Cx = cx;
            this.Cy = cy;
            this.Strength = strength;
        }

        protected override void Initialize() { }

        #region setters
        public ForceCenter<TNode> SetCx(double cx)
        {
            this.Cx = cx;
            return this;
        }
        public ForceCenter<TNode> SetCy(double cy)
        {
            this.Cy = cy;
            return this;
        }
        public ForceCenter<TNode> SetStrength(double strength)
        {
            this.Strength = strength;
            return this;
        }
        #endregion

        public override Force<TNode> UseForce(double alpha = 0)
        {
            int i;
            int n = Nodes.Count;
            TNode node;
            double sx = 0;
            double sy = 0;

            for (i = 0; i < n; ++i)
            {
                node = Nodes[i];
                sx += node.X;
                sy += node.Y;
            }

            for (sx = (sx / n - Cx) * Strength,
                 sy = (sy / n - Cy) * Strength,
                 i = 0; i < n; ++i)
            {
                node = Nodes[i];
                node.X -= sx;
                node.Y -= sy;
            }
            return this;
        }

    }
}
