class UsersController < ApplicationController
	# before_filter :cors_preflight_check
	after_filter :cors_set_access_control_headers if :options

	def new
		render text: "one #{params}" and return
	end

	def options
		render text: "two #{params['location']}" and return
	end

  def create
    User.create(params[:location])
		render text: "You are on #{params['location']}" and return
	end

  private
		def cors_set_access_control_headers
		  headers['Access-Control-Allow-Origin'] = '*'
		  headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
		  headers['Access-Control-Max-Age'] = "1728000"
		end
end





# THESE WORK TO SEND THIS CONTROLLER STUFF


# --------- Without jQuery -------------------------
# ---- Running on Server Locally
# var data = new FormData();
# data.append('url', window.location.toString())
# var url = "http://localhost:3000/users";
# var xhr = new XMLHttpRequest();
# xhr.open("post", url, true);
# xhr.onload = function(info){console.log(info)}
# xhr.send(data)
# xhr.response

# ---- Hosted on Heroku
# var data = new FormData();
# data.append('url', window.location.toString())
# var url = "http://cors-test-101.herokuapp.com/users";
# var xhr = new XMLHttpRequest();
# xhr.open("post", url, true);
# xhr.onload = function(info){console.log(info)}
# xhr.send(data)
# xhr.response
# --------------------------------------------------





# ----------- With jQuery -------------------------------------

# ---- Running on Server Locally
# (function(){
#   var newscript = document.createElement('script');
#      newscript.type = 'text/javascript';
#      newscript.async = true;
#      newscript.src = 'http://code.jquery.com/jquery-latest.min.js';
#   (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
# })();

# here = window.location.toString()
# xhr = $.ajax({
#   type: "post",
#   url: "http://localhost:3000/users",
#   data: {'url': here},
#   crossDomain: true,
#   xhrFields: {
#     withCredentials: true
#   }
# })
# xhr.responseText


# ---- Hosted on Heroku
# (function(){
#   var newscript = document.createElement('script');
#      newscript.type = 'text/javascript';
#      newscript.async = true;
#      newscript.src = 'http://code.jquery.com/jquery-latest.min.js';
#   (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
# })();

# var here = window.location.toString()
# xhr = $.ajax({
#   type: "post",
#   url: "http://cors-test-101.herokuapp.com/users/",
#   data: {'url': here},
#   crossDomain: true,
#   xhrFields: {
#     withCredentials: true
#   }
# })
# xhr.responseText

# --------------------------------------------------
