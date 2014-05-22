class UsersController < ApplicationController
	before_filter :cors_preflight_check
	after_filter :cors_set_access_control_headers if :options

	def new
		debugger
		render text: "one #{params}" and return
	end

	def options
		debugger
		render text: "two #{params['location']}" and return
	end

  def create
		debugger
		render text: "You are on #{params['location']}" and return
	end

  private

  def set_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Expose-Headers'] = 'ETag'
    headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD'
    headers['Access-Control-Allow-Headers'] = '*,x-requested-with,Content-Type,If-Modified-Since,If-None-Match'
    headers['Access-Control-Max-Age'] = '86400'
  end

# end


	# For all responses in this controller, return the CORS access control headers.

	def cors_set_access_control_headers
	  headers['Access-Control-Allow-Origin'] = '*'
	  headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
	  headers['Access-Control-Max-Age'] = "1728000"
	end

	# If this is a preflight OPTIONS request, then short-circuit the
	# request, return only the necessary headers and return an empty
	# text/plain.

	def cors_preflight_check
	  if request.method == :options
	    headers['Access-Control-Allow-Origin'] = '*'
	    headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
	    headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-Prototype-Version'
	    headers['Access-Control-Max-Age'] = '1728000'
	    render :text => '', :content_type => 'text/plain'
	  end
	end
end




# var data = new FormData();
# data.append('location', window.location.toString())

# var url = "http://localhost:3000/users";
# var xhr = new XMLHttpRequest();
# xhr.open("post", url, true);
# xhr.onload = function(info){console.log(info)}
# xhr.send(data)















# THIS WORKS TO SEND THIS CONTROLLER STUFF
# (function(){
#   var newscript = document.createElement('script');
#      newscript.type = 'text/javascript';
#      newscript.async = true;
#      newscript.src = 'http://code.jquery.com/jquery-latest.min.js';
#   (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
# })();



# here = window.location.toString()
# a = $.ajax({
#   type: "post",
#   url: "http://localhost:3000/users",
#   data: {'location': here},
#   crossDomain: true,
#   xhrFields: {
#     withCredentials: true
#   }
# })