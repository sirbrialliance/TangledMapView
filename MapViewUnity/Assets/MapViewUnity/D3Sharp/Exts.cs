using System;
using System.Collections.Generic;

namespace D3Sharp
{
    public static class Exts
    {
        public static bool IsNullOrEmpty<T>(this IList<T> list)
        {
            return list == null || list.Count < 1;
        }


        public static int ToInt(this bool self)
        {
            return self ? 1 : 0;
        }

        public static void Push<T>(this List<T> self, T value)
        {
            self.Add(value);
        }

        public static T Pop<T>(this List<T> self)
        {
            if (self.IsNullOrEmpty())
                return default;
            var count = self.Count;
            if (count == 0)
                return default;
            T t = self[count - 1];
            self.RemoveAt(count - 1);
            return t;
        }

    }
}
