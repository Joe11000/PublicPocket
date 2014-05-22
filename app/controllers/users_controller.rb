class UsersController < ApplicationController
	before_filter :set_headers

	def new
		render text: "It worked from #{params['location']}" and return
	end

	def options

	end

  private

  def set_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Expose-Headers'] = 'ETag'
    headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD'
    headers['Access-Control-Allow-Headers'] = '*,x-requested-with,Content-Type,If-Modified-Since,If-None-Match'
    headers['Access-Control-Max-Age'] = '86400'
  end

end

# var xhr = new XMLHttpRequest();
# xhr.open("get", "http://cors-test-101.herokuapp.com/users/new", true);
# xhr.onload = function(info){console.log(info)}
# xhr.send({'location': "http://www.video.nhl.com"})


# xhr.setRequestHeader('Access-Control-Allow-Origin','*')
