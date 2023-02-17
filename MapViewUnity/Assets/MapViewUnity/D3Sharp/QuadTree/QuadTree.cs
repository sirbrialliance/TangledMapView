using System;
using System.Collections.Generic;
using System.Text;

namespace D3Sharp.QuadTree
{
    public partial class QuadTree<TData, TNode>
        where TData : IQuadData
        where TNode : QuadNode<TData>, new()
    {

        public TNode Root { get; private set; }

        double X0 { get; set; } = double.NaN;
        double Y0 { get; set; } = double.NaN;
        double X1 { get; set; } = double.NaN;
        double Y1 { get; set; } = double.NaN;


        public QuadTree(double x0, double y0, double x1, double y1)
            : this(null, null, null, x0, y0, x1, y1)
        {
        }

        public QuadTree(Func<TData, double> getX, Func<TData, double> getY)
           : this(null, getX, getY)
        {
        }

        public QuadTree(IList<TData> datas = null,
            Func<TData, double> getX = null, Func<TData, double> getY = null,
            double x0 = double.NaN, double y0 = double.NaN,
            double x1 = double.NaN, double y1 = double.NaN)
        {
            this.X0 = x0;
            this.Y0 = y0;
            this.X1 = x1;
            this.Y1 = y1;
            this.GetX = getX;
            this.GetY = getY;
            if (datas != null)
                AddAll(datas);
        }

        public Func<TData, double> GetX { get; }
        public Func<TData, double> GetY { get; }

        private double getX(TData data) => GetX == null ? data.X : GetX(data);
        private double getY(TData data) => GetY == null ? data.Y : GetY(data);

        public int Size
        {
            get
            {
                var size = 0;
                this.Visit((node, a, s, d, f) =>
                {
                    if (node.IsLeaf)
                    {
                        do ++size;
                        while ((node = (TNode)node.Next) != null);
                    }
                    return false;
                });
                return size;
            }
        }

        public double[,] Extents
        {
            get
            {
                if (double.IsNaN(this.X0) || double.IsNaN(this.X1)
                    || double.IsNaN(this.Y0) || double.IsNaN(this.Y1))
                    return null;
                return new double[,] { { this.X0, this.Y0 }, { this.X1, this.Y1 } };
            }
            set
            {
                if (value != null)
                    this.Cover(value[0, 0], value[0, 1]).Cover(value[1, 0], value[1, 1]);
                else
                {
                    this.X0 = double.NaN;
                    this.X1 = double.NaN;
                    this.Y0 = double.NaN;
                    this.Y1 = double.NaN;
                }

            }
        }

        public List<TData> Data
        {
            get
            {
                var data = new List<TData>();
                this.Visit((node, a, s, d, f) =>
                {
                    if (node.IsLeaf)
                    {
                        do data.Add(node.Data);
                        while ((node = (TNode)node.Next) != null);
                    }
                    return false;
                });
                return data;
            }
        }

    }
}