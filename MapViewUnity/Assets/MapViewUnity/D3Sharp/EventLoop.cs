using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;

namespace D3Sharp
{
    public class EventLoop : IDisposable
    {
        Thread thread;
        bool requestStop = false;
        int interval = 1;
        bool isBackground;

        public bool IsRunning { get; private set; }
        
        public event EventHandler Events;

        public EventLoop(int interval = 1, bool isBackground = true)
        {
            this.Interval = interval;
            this.isBackground = isBackground;
        }

        public int Interval
        {
            get => this.interval;
            set
            {
                if (value <= 0)
                    throw new ArgumentException("interval must > 0");
                this.interval = value;
            }
        }

        void run()
        {
            requestStop = false;
            IsRunning = true;
            Delegate[] events;

            while (!requestStop)
            {
                events = Events.GetInvocationList();
                foreach (var item in events)
                {
                    if (requestStop)
                        break;
                    item.DynamicInvoke(this, EventArgs.Empty);
                }
                Thread.Sleep(interval);
            }
            IsRunning = false;
        }

        public void Start()
        {
            if (IsRunning)
                return;
            thread = new Thread(new ThreadStart(run));
            thread.Name = "EvenLoop Thread";
            thread.IsBackground = isBackground;
            thread.Start();
        }

        public void Stop() => this.requestStop = true;

        public void Abort() => thread.Abort();

        public void Dispose()
        {
            Events = null;
            thread = null;
        }
    }
}
