using System;
using System.Collections.Generic;
using System.Text;

namespace D3Sharp.Force
{
    public abstract class Force<TNode> : IDisposable where TNode : INode
    {
        private IList<TNode> nodes;
        private IRandom random;


        public IList<TNode> Nodes
        {
            get => nodes;
            set { this.nodes = value; Initialize(); }
        }

        public IRandom RandomSource
        {
            get => random;
            set { this.random = value; Initialize(); }
        }

        public Force() { }

        protected abstract void Initialize();

        public Force<TNode> Initialize(IList<TNode> nodes, IRandom randomSource)
        {
            this.nodes = nodes;
            this.random = randomSource;
            Initialize();
            return this;
        }

        public abstract Force<TNode> UseForce(double alpha = 0);

        #region dispose
        private bool disposedValue;
        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    this.RandomSource = null;
                }
                this.nodes = null;
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
