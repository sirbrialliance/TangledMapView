using System;
using System.Collections.Generic;
using System.Text;

namespace D3Sharp.QuadTree
{
    public interface IQuadData
    {
        /// <summary>
        /// the node’s current x-position, by default set to double.NaN
        /// </summary>
        public double X { get; }
        /// <summary>
        /// the node’s current y-position, by default set to double.NaN
        /// </summary>
        public double Y { get; }
    }
}
