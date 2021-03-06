$(function()
{
	$('.read_status').each(function(index, element)
  {
    $(this).change(function(e)
    {
      e.preventDefault();

      url_status_to_modify = $(e.currentTarget).siblings('a').attr('href')
      read_status = e.currentTarget.checked ? "read" : "unread"

      var url = "http://localhost:3000/sites/1/update"
    //var url = "http://cors-test-101.herokuapp.com/sites/1/update"

      xhr = $.ajax({
        type: "post",
        url: url,
        data: { 'url': url_status_to_modify, 'read_status': read_status },
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        }
      }, 'text')
      .always(function(response_val)
      {
        if(arguments[1] != 'success')
          {
            throw "Unsuccessful Read Status Update"
            console.log('select updated to : ' + response_val)
          }
      });
	  })
  });
});

