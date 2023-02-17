using System;
using System.Collections.Generic;
using System.Text;

namespace D3Sharp.Force
{
    public class Link
    {
        /// <summary>
        /// Index of Links, auto set
        /// </summary>
        public int Index { get; set; }

        private object source;
        private object target;

        public object Source
        {
            get => source;
            set
            {
                if (value is int || value is INode)
                    this.source = value;
                else
                    throw new ArrayTypeMismatchException("int or INode only");
            }
        }

        public object Target
        {
            get => target;
            set
            {
                if (value is int || value is INode)
                    this.target = value;
                else
                    throw new ArrayTypeMismatchException("int or INode only");
            }
        }
    }
}