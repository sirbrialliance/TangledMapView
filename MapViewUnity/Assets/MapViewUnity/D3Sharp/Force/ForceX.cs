using System;
using System.Collections.Generic;
using System.Text;

namespace D3Sharp.Force
{
    public class ForceX<TNode> : Force<TNode> where TNode : INode
    {
        double[] strengths, xz;
        ForceDelegate<TNode> xFunc;
        ForceDelegate<TNode> strengthFunc;

        #region Constructors
        public ForceX(ForceDelegate<TNode> xFunc = null)
        {
            strengthFunc = defaultStrength;
            this.xFunc = xFunc == null ? defaultX : xFunc;
        }

        public ForceX(double x)
        {
            strengthFunc = defaultStrength;
            this.SetX(x);
        }
        #endregion

        protected override void Initialize()
        {
            if (Nodes.IsNullOrEmpty()) return;
            int n = Nodes.Count;
            strengths = new double[n];
            xz = new double[n];
            for (int i = 0; i < n; i++)
            {
                strengths[i] = double.IsNaN(xz[i] = XFunc(Nodes[i], i, Nodes)) ? 0 : strengthFunc(Nodes[i], i, Nodes);
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
        public ForceX<TNode> SetStrength(double strength)
        {
            this.StrengthFunc = (_, __, ___) => strength;
            return this;
        }

        double defaultX(TNode node, int i, IList<TNode> nodes) => 0;
        public ForceDelegate<TNode> XFunc
        {
            get => this.xFunc;
            set
            {
                this.xFunc = value == null ? defaultX : value;
                Initialize();
            }
        }
        public ForceX<TNode> SetX(double x)
        {
            this.XFunc = (_, __, ___) => x;
            return this;
        }
        #endregion

        public override Force<TNode> UseForce(double alpha = 0)
        {
            TNode node;
            for (int i = 0, n = Nodes.Count; i < n; i++)
            {
                node = Nodes[i];
                node.Vx += (xz[i] - node.X) * strengths[i] * alpha;
            }
            return this;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                xFunc = null;
                strengthFunc = null;
            }
            strengths = null;
            xz = null;
            base.Dispose(disposing);
        }
    }
}
