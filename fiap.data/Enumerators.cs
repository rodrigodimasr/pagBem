﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace fiap.data
{
    public enum Logical { And = 0, Or };
    public enum Conditional { Equal = 0, NotEqual, Bigger, BiggerEqual, Smaller, SmallerEQual, Null, NotNull }
    public enum PrinterLengthLine { Daruma = 30, Sweda = 30, Diebold = 42 };
}
