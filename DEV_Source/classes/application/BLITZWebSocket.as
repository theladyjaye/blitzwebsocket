package application
{
	import flash.display.MovieClip;
	import flash.net.URLStream;
	import flash.net.URLRequest;
	import flash.events.*;
	import flash.external.ExternalInterface;
	
	public class BLITZWebSocket extends MovieClip
	{
		private var stream : URLStream;
		
		public function BLITZWebSocket()
		{
			stream = new URLStream();
			stream.addEventListener(IOErrorEvent.IO_ERROR, ioErrorHandler);
			stream.addEventListener(ProgressEvent.PROGRESS, progressHandler);
			stream.addEventListener(SecurityErrorEvent.SECURITY_ERROR, securityErrorHandler);
			
			stream.load(new URLRequest("http://127.0.0.1:4599/register/stream"));
		}

		private function progressHandler(event:Event):void 
		{
			if (ExternalInterface.available)
			{
				ExternalInterface.call("setMessage", stream.readUTFBytes(stream.bytesAvailable));
			}
		}

		private function securityErrorHandler(event:SecurityErrorEvent):void 
		{
			trace("securityErrorHandler: " + event);
		}

		private function ioErrorHandler(event:IOErrorEvent):void 
		{
			trace("ioErrorHandler: " + event);
		}
	}
}