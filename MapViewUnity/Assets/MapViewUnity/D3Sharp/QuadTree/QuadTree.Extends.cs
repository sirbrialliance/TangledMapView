using System;
using System.Collections.Generic;
using System.Text;

namespace D3Sharp.QuadTree
{
    public partial class QuadTree<TData, TNode>
       where TData : IQuadData
       where TNode : QuadNode<TData>, new()
    {
        public QuadTree<TData, TNode> Cover(double x, double y)
        {
            if (double.IsNaN(x) || double.IsNaN(y))
                return this;

            var x0 = this.X0;
            var y0 = this.Y0;
            var x1 = this.X1;
            var y1 = this.Y1;

            if (double.IsNaN(x0))
            {
                x1 = (x0 = Math.Floor(x)) + 1;
                y1 = (y0 = Math.Floor(y)) + 1;
            }
            else
            {
                double z = x1 - x0;
                if (z == 0) z = 1;
                var node = Root;
                TNode parent = null;
                int i = 0;
                while (x0 > x || x >= x1 || y0 > y || y >= y1)
                {
                    i = (y < y0).ToInt() << 1 | (x < x0).ToInt();
                    parent = new TNode();
                    parent[i] = node;
                    node = parent;
                    z *= 2;
                    switch (i)
                    {
                        case 0: x1 = x0 + z; y1 = y0 + z; break;
                        case 1: x0 = x1 - z; y1 = y0 + z; break;
                        case 2: x1 = x0 + z; y0 = y1 - z; break;
                        case 3: x0 = x1 - z; y0 = y1 - z; break;
                    }
                }
                if (Root != null && !Root.IsLeaf)
                    this.Root = node;
            }
            this.X0 = x0;
            this.Y0 = y0;
            this.X1 = x1;
            this.Y1 = y1;
            return this;
        }

        public QuadTree<TData, TNode> Extent(double[,] extents)
        {
            this.Extents = extents;
            return this;
        }

        public QuadTree<TData, TNode> Extent(double x0, double y0, double x1, double y1)
        {
            this.Extents = new double[,] { { x0, y0 }, { x1, y1 } };
            return this;
        }

        public QuadTree<TData, TNode> Copy()
        {
            var copy = new QuadTree<TData, TNode>(this.X0, this.Y0, this.X1, this.Y1);
            var node = this.Root;
            if (node == null)
                return copy;

            if (node.IsLeaf)
            {
                copy.Root = leafCopy(node);
                return copy;
            }

            var nodes = new List<KeyValuePair<TNode, TNode>>()
            {
                new KeyValuePair<TNode, TNode>(
                    node, copy.Root =new TNode()
                    )
            };
            TNode child;
            KeyValuePair<TNode, TNode> pair;
            while (nodes.Count > 0)
            {
                pair = nodes.Pop();
                for (int i = 0; i < 4; i++)
                {
                    if ((child = (TNode)pair.Key[i]) != null)
                    {
                        if (child.IsLeaf)
                            pair.Value[i] = leafCopy(child);
                        else
                        {
                            nodes.Push(
                                new KeyValuePair<TNode, TNode>(
                                    child, (TNode)(pair.Value[i] = new TNode())
                                ));
                        }
                    }
                }
            }
            return copy;
        }

        private TNode leafCopy(TNode leaf)
        {
            var copy = new TNode { Data = leaf.Data };
            var next = copy;

            while ((leaf = (TNode)leaf.Next) != null)
            {
                next.Next = new TNode { Data = leaf.Data };
                next = (TNode)next.Next;
            }
            return copy;
        }
    }
}
