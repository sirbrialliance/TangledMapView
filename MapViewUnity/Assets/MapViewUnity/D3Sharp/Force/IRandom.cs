using System;
using System.Collections.Generic;
using System.Text;

namespace D3Sharp.Force
{
    // public interface IRandom
    public abstract class IRandom
    {
        public static double Jiggle(IRandom random)
        {
            return (random.Next() - 0.5) * 1e-6;
        }

        /// <summary>
        /// return 0-1
        /// </summary>
        /// <returns></returns>
        public abstract double Next();
        public abstract void Reset();
    }

    public class Lcg : IRandom
    {
        const long a = 1664525;
        const long c = 1013904223;
        const long m = 4294967296; // 2^32
        double seed = 1;

        public Lcg()
        {
            //Next();
        }

        public override double Next()
        {
            seed = (a * seed + c) % m;
            return seed / m;
        }

        public override void Reset()
        {
            seed = 1;
        }
    }
}
