using System;
using System.Collections.Generic;
using System.Text;

namespace D3Sharp.Force
{
    public interface INode : QuadTree.IQuadData
    {
        /// <summary>
        /// the node’s zero-based index into nodes
        /// </summary>
        public int Index { get; set; }
        /// <summary>
        /// the node’s fixed x-position, by default set to double.NaN
        /// </summary>
        public double Fx { get; set; }
        /// <summary>
        /// the node’s fixed y-position, by default set to double.NaN
        /// </summary>
        public double Fy { get; set; }
        /// <summary>
        /// the node’s current x-velocity, by default set to 0
        /// </summary>
        public double Vx { get; set; }
        /// <summary>
        /// the node’s current y-velocity, by default set to 0
        /// </summary>
        public double Vy { get; set; }

        /// <summary>
        /// the node’s current x-position
        /// </summary>
        public new double X { get; set; }
        /// <summary>
        /// the node’s current y-position
        /// </summary>
        public new double Y { get; set; }
    }

    /// <summary>
    /// Simple implementation for <see cref="INode"/>
    /// </summary>
    public class Node : INode
    {
        /// <summary>
        /// the node’s zero-based index into nodes
        /// </summary>
        public int Index { get; set; }
        /// <summary>
        /// the node’s fixed x-position, by default set to double.NaN
        /// </summary>
        public double Fx { get; set; } = double.NaN;
        /// <summary>
        /// the node’s fixed y-position, by default set to double.NaN
        /// </summary>
        public double Fy { get; set; } = double.NaN;
        /// <summary>
        /// the node’s current x-velocity, by default set to 0
        /// </summary>
        public double Vx { get; set; } = double.NaN;
        /// <summary>
        /// the node’s current y-velocity, by default set to 0
        /// </summary>
        public double Vy { get; set; } = double.NaN;
        /// <summary>
        /// the node’s current x-position
        /// </summary>
        public virtual double X { get; set; } = double.NaN;
        /// <summary>
        /// the node’s current y-position
        /// </summary>
        public virtual double Y { get; set; } = double.NaN;

        public override string ToString()
        {
            return $"{{X:{X}, Y:{Y}, Index:{Index}, Vx:{Vx}, Vy:{Vy}, Fx:{Fx}, Fy:{Fy}}}";
        }
    }
}
