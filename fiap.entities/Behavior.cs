using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace fiap.entities
{
    public static class ConversionExtensionMethods
    {
        public static int? ToInt32Nullable(this object self)
        {
            var s = Convert.ToString(self);

            if (string.IsNullOrWhiteSpace(s))
                return null;

            var val = 0d;
            if (!double.TryParse(s, out val))
                return null;

            return (int)val;
        }
        public static Nullable<T> ToEnumNullable<T>(this string self) where T : struct
        {
            if (string.IsNullOrWhiteSpace(self))
                return null;

            T val;

            if (!Enum.TryParse<T>(self, out val))
                return null;

            return val;
        }
        public static Nullable<T> ToEnumNullable<T>(this object self) where T : struct
        {
            var s = Convert.ToString(self ?? string.Empty);
            return s.ToEnumNullable<T>();
        }

        public static string ToSqlString(this DateTime self)
        {
            var s = self.ToString("yyyyMMdd HH:mm:ss");
            return s;
        }
        public static string ToSqlString(this DateTime? self)
        {
            var s = (self.HasValue ? self.Value.ToString("yyyyMMdd HH:mm:ss") : null);
            return s;
        }
        public static string ToSqlString(this decimal self)
        {
            var s = self.ToString(System.Globalization.CultureInfo.InvariantCulture);
            return s;
        }
        public static string ToSqlString(this decimal? self)
        {
            var s = (self.HasValue ? self.Value.ToString(System.Globalization.CultureInfo.InvariantCulture) : null);
            return s;
        }
        public static string ToSqlString(this double self)
        {
            var s = self.ToString(System.Globalization.CultureInfo.InvariantCulture);
            return s;
        }
        public static string ToSqlString(this double? self)
        {
            var s = (self.HasValue ? self.Value.ToString(System.Globalization.CultureInfo.InvariantCulture) : null);
            return s;
        }
        public static string ToSqlString(this float self)
        {
            var s = self.ToString(System.Globalization.CultureInfo.InvariantCulture);
            return s;
        }
        public static string ToSqlString(this float? self)
        {
            var s = (self.HasValue ? self.Value.ToString(System.Globalization.CultureInfo.InvariantCulture) : null);
            return s;
        }
    }
}
