using System;
using System.Collections.Generic;
using System.Text;

namespace D3Sharp.QuadTree
{
    public partial class QuadTree<TData, TNode>
        where TData : IQuadData
        where TNode : QuadNode<TData>, new()
    {
        public QuadTree<TData, TNode> Add(TData data)
        {
            var x = getX(data);
            var y = getY(data);
            return this.Cover(x, y).add(x, y, data);
        }

        private QuadTree<TData, TNode> add(double x, double y, TData data)
        {
            if (double.IsNaN(x) || double.IsNaN(y))
                return this;
            TNode parent = null;
            bool right = false, bottom = false;
            double xm = 0, ym = 0, xp = 0, yp = 0;
            double x0 = this.X0, y0 = this.Y0,
                   x1 = this.X1, y1 = this.Y1;
            int i = 0, j = 0;

            TNode node = this.Root;
            TNode leaf = new TNode { Data = data };
            if (Root == null)//empty tree
            {
                Root = leaf;
                return this;
            }

            while (!node.IsLeaf)
            {
                if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
                if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
                parent = node;

                if ((node = node[i = bottom.ToInt() << 1 | right.ToInt()]
                    as TNode) == null)
                {
                    parent[i] = leaf;
                    return this;
                }
            }
            Console.WriteLine(data);
            xp = getX(node.Data); yp = getY(node.Data);
            if (x == xp && y == yp)
            {
                leaf.Next = node;
                if (parent != null)
                    parent[i] = leaf;
                else
                    Root = leaf;
                return this;
            }
            do
            {
                parent = parent != null
                    ? (TNode)(parent[i] = new TNode())
                    : (Root = new TNode());
                if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
                if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;

            } while ((i = bottom.ToInt() << 1 | right.ToInt()) == (j = (yp >= ym).ToInt() << 1 | (xp >= xm).ToInt()));
            parent[j] = node;
            parent[i] = leaf;

            return this;
        }

        public QuadTree<TData, TNode> AddAll(IList<TData> datas)
        {
            int n = datas.Count;
            double[] xz = new double[n];
            double[] yz = new double[n];
            double x0 = double.PositiveInfinity;
            double y0 = double.PositiveInfinity;
            double x1 = double.NegativeInfinity;
            double y1 = double.NegativeInfinity;
            double x, y;
            TData data;
            for (int i = 0; i < n; i++)
            {
                data = datas[i];
                if (double.IsNaN(x = getX(data)) || double.IsNaN(y = getY(data)))
                    continue;
                xz[i] = x;
                yz[i] = y;
                if (x < x0) x0 = x;
                if (x > x1) x1 = x;
                if (y < y0) y0 = y;
                if (y > y1) y1 = y;
            }
            if (x0 > x1 || y0 > y1) return this;

            this.Cover(x0, y0).Cover(x1, y1);

            for (int i = 0; i < n; i++)
            {
                add(xz[i], yz[i], datas[i]);
            }

            return this;
        }

        public QuadTree<TData, TNode> Remove(TData d)
        {
            double x = getX(d), y = getY(d);
            if (double.IsNaN(x) || double.IsNaN(y))
                return this;

            var node = this.Root;
            if (node == null) return this;

            var x0 = this.X0;
            var y0 = this.Y0;
            var x1 = this.X1;
            var y1 = this.Y1;
            TNode next;
            TNode parent = null, previous = null, retainer = null;
            double xm = 0, ym = 0;
            bool right, bottom;

            int i = 0, j = 0;
            if (!node.IsLeaf)
            {
                while (true)
                {
                    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
                    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
                    parent = node;
                    if ((node = node[i = bottom.ToInt() << 1 | right.ToInt()]
                        as TNode) == null)
                        return this;
                    if (node.IsLeaf)
                        break;
                    if (parent[(i + 1) & 3] != null
                        || parent[(i + 2) & 3] != null
                        || parent[(i + 3) & 3] != null)
                    {
                        retainer = parent;
                        j = i;
                    }
                }
            }

            while (node.Data?.Equals(d) != true)
            {
                previous = node;
                node = (TNode)node.Next;
                if (node == null)
                    return this;
            }
            if ((next = (TNode)node.Next) != null)
                node.Next = null;

            if (previous != null)
            {
                if (next != null) previous.Next = next;
                else previous.Next = null;
                return this;
            }

            if (parent == null)
            {
                this.Root = next;
                return this;
            }

            if (next != null)
                parent[i] = next;
            else
                parent[i] = null;

            if (parent.Length == 1)
            {
                node = (TNode)(parent[0] ?? parent[1] ?? parent[2] ?? parent[3]);
                if (node.Length == 0)
                {
                    if (retainer != null)
                        retainer[j] = node;
                    else this.Root = node;
                }
            }

            return this;
        }

        public QuadTree<TData, TNode> RemoveAll(IList<TData> datas)
        {
            foreach (var item in datas)
            {
                this.Remove(item);
            }
            return this;
        }

    }
}
