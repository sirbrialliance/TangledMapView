using System;
using System.Collections.Generic;
using System.Text;

namespace D3Sharp.QuadTree
{
    public class QuadNode<T>
    {
        protected QuadNode<T>[] children = new QuadNode<T>[4];

        public virtual T Data { get; set; }

        public QuadNode<T> Next { get; internal set; }

        public QuadNode<T>[] Children => children;

        public QuadNode<T> this[int index]
        {
            get
            {
                if (index < 0 || index > 3)
                    throw new IndexOutOfRangeException();
                return Children[index];
            }
            set
            {
                Children[index] = value;
            }
        }

        public bool IsLeaf => Length == 0;

        public int Length
        {
            get
            {
                int length = 0;
                foreach (var item in Children)
                {
                    if (item != null)
                        length++;
                }
                return length;
            }
        }

        public QuadNode() { }

    }
}
