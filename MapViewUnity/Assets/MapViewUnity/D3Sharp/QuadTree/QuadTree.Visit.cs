using System;
using System.Collections.Generic;
using System.Text;

namespace D3Sharp.QuadTree
{
    public partial class QuadTree<TData, TNode>
         where TData : IQuadData
         where TNode : QuadNode<TData>, new()
    {
        public TData Find(double x, double y, double radius = double.NaN)
        {
            TData data = default;
            var x0 = this.X0;
            var y0 = this.Y0;
            double x1, y1, x2, y2;
            var x3 = this.X1;
            var y3 = this.Y1;
            List<Quad> quads = new List<Quad>();
            var node = this.Root;
            if (node != null)
                quads.Push(new Quad(node, x0, y0, x3, y3));
            if (double.IsNaN(radius))
                radius = double.PositiveInfinity;
            else
            {
                x0 = x - radius; y0 = y - radius;
                x3 = x + radius; y3 = y + radius;
                radius *= radius;
            }
            Quad q;
            int i = 0;
            while (quads.Count > 0)
            {
                q = quads.Pop();
                node = (TNode)q.Node;
                if (node == null
                    || (x1 = q.X0) > x3
                    || (y1 = q.Y0) > y3
                    || (x2 = q.X1) < x0
                    || (y2 = q.Y1) < y0
                   ) continue;
                if (!node.IsLeaf)
                {
                    var xm = (x1 + x2) / 2;
                    var ym = (y1 + y2) / 2;
                    quads.Push(new Quad(node[3], xm, ym, x2, y2));
                    quads.Push(new Quad(node[2], x1, ym, xm, y2));
                    quads.Push(new Quad(node[1], xm, y1, x2, ym));
                    quads.Push(new Quad(node[0], x1, y1, xm, ym));

                    i = (y >= ym).ToInt() << 1 | (x >= xm).ToInt();
                    if (i != 0)
                    {
                        int count = quads.Count;
                        q = quads[count - 1];
                        quads[count - 1] = quads[count - 1 - i];
                        quads[count - 1 - i] = q;
                    }
                }
                else
                {
                    var dx = x - getX(node.Data);
                    var dy = y - getY(node.Data);
                    var d2 = dx * dx + dy * dy;
                    if (d2 < radius)
                    {
                        var d = Math.Sqrt(radius = d2);
                        x0 = x - d; y0 = y - d;
                        x3 = x + d; y3 = y + d;
                        data = node.Data;
                    }
                }
            }
            return data;
        }

        public QuadTree<TData, TNode> VisitAfter(Action<TNode, double, double, double, double> callback)
        {
            Stack<Quad> quads = new Stack<Quad>();
            Stack<Quad> next = new Stack<Quad>();
            Quad q;
            if (this.Root != null)
                quads.Push(new Quad(this.Root, this.X0, this.Y0, this.X1, this.Y1));
            QuadNode<TData> child;
            while (quads.Count > 0)
            {
                q = quads.Pop();
                var node = (TNode)q.Node;
                if (!node.IsLeaf)
                {
                    double x0 = q.X0, x1 = q.X1, y0 = q.Y0, y1 = q.Y1;
                    double xm = (x0 + x1) / 2; double ym = (y0 + y1) / 2;
                    if ((child = node[0]) != null) quads.Push(new Quad(child, x0, y0, xm, ym));
                    if ((child = node[1]) != null) quads.Push(new Quad(child, xm, y0, x1, ym));
                    if ((child = node[2]) != null) quads.Push(new Quad(child, x0, ym, xm, y1));
                    if ((child = node[3]) != null) quads.Push(new Quad(child, xm, ym, x1, y1));
                }
                next.Push(q);
            }
            while (next.Count > 0)
            {
                q = next.Pop();
                callback((TNode)q.Node, q.X0, q.Y0, q.X1, q.Y1);
            }
            return this;
        }

        public QuadTree<TData, TNode> Visit(Func<TNode, double, double, double, double, bool> callback)
        {
            Stack<Quad> quads = new Stack<Quad>();
            Quad q;
            TNode node = this.Root;
            double x0, y0, x1, y1;
            if (node != null)
                quads.Push(new Quad(node, this.X0, this.Y0, this.X1, this.Y1));
            QuadNode<TData> child;
            while (quads.Count > 0)
            {
                q = quads.Pop();
                node = (TNode)q.Node;
                var re = !callback(node, x0 = q.X0, y0 = q.Y0, x1 = q.X1, y1 = q.Y1);
                if (re && !node.IsLeaf)
                {
                    var xm = (x0 + x1) / 2; var ym = (y0 + y1) / 2;
                    if ((child = node[3]) != null) quads.Push(new Quad(child, xm, ym, x1, y1));
                    if ((child = node[2]) != null) quads.Push(new Quad(child, x0, ym, xm, y1));
                    if ((child = node[1]) != null) quads.Push(new Quad(child, xm, y0, x1, ym));
                    if ((child = node[0]) != null) quads.Push(new Quad(child, x0, y0, xm, ym));
                }
            }
            return this;
        }

        #region inner class
        class Quad
        {
            public QuadNode<TData> Node { get; set; }
            public double X0 { get; set; }
            public double Y0 { get; set; }
            public double X1 { get; set; }
            public double Y1 { get; set; }

            public Quad(QuadNode<TData> node, double x0, double y0, double x1, double y1)
            {
                this.Node = node;
                this.X0 = x0;
                this.Y0 = y0;
                this.X1 = x1;
                this.Y1 = y1;
            }
        }
        #endregion
    }
}
