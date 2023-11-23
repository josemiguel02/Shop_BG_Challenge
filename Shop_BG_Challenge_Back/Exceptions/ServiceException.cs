using System;

namespace Shop_BG_Challenge.Exceptions;

public class ServiceException : Exception
{
    public ServiceException(string error) : base(error)
    {
    }
}