using System;
using System.Collections.Generic;
using System.Text;

namespace D3Sharp.Force
{
    public class ForceY<TNode> : Force<TNode> where TNode : INode
    {
        double[] strengths, yz;
        ForceDelegate<TNode> yFunc;
        ForceDelegate<TNode> strengthFunc;

        #region Constructors
        public ForceY(ForceDelegate<TNode> yFunc = null)
        {
            strengthFunc = defaultStrength;
            this.yFunc = yFunc == null ? defaultY : yFunc;
        }

        public ForceY(double y)
        {
            strengthFunc = defaultStrength;
            this.SetY(y);
        }
        #endregion

        protected override void Initialize()
        {
            if (Nodes.IsNullOrEmpty()) return;
            int n = Nodes.Count;
            strengths = new double[n];
            yz = new double[n];
            for (int i = 0; i < n; i++)
            {
                strengths[i] = double.IsNaN(yz[i] = yFunc(Nodes[i], i, Nodes)) ? 0 : strengthFunc(Nodes[i], i, Nodes);
            }
        }

        #region func properties
        double defaultStrength(TNode node, int i, IList<TNode> nodes) => 0.1;
        public ForceDelegate<TNode> StrengthFunc
        {
            get => this.strengthFunc;
            set
            {
                this.strengthFunc = value == null ? defaultStrength : value;
                Initialize();
            }
        }
        public ForceY<TNode> SetStrength(double strength)
        {
            this.StrengthFunc = (_, __, ___) => strength;
            return this;
        }

        double defaultY(TNode node, int i, IList<TNode> nodes) => 0;
        public ForceDelegate<TNode> YFunc
        {
            get => this.yFunc;
            set
            {
                this.yFunc = value == null ? defaultY : value;
                Initialize();
            }
        }
        public ForceY<TNode> SetY(double y)
        {
            this.YFunc = (_, __, ___) => y;
            return this;
        }
        #endregion

        public override Force<TNode> UseForce(double alpha = 0)
        {
            TNode node;
            for (int i = 0, n = Nodes.Count; i < n; i++)
            {
                node = Nodes[i];
                node.Vy += (yz[i] - node.Y) * strengths[i] * alpha;
            }
            return this;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                yFunc = null;
                strengthFunc = null;
            }
            strengths = null;
            yz = null;
            base.Dispose(disposing);
        }
    }
}
