$(function(){
    var pxl_lg = 1170;

    // initial setting
    if($(window).width() >= pxl_lg)
    {
      $("#side_col").addClass("lg-fixed-pos")
    }
    else
    {
      $("#side_col").removeClass("lg-fixed-pos")
    }

    // resizing
    $(window).resize(function()
    {
      if( $(window).width() < pxl_lg )
      {
        $("#side_col").removeClass("lg-fixed-pos")
      }
      else
      {
        $("#side_col").addClass("lg-fixed-pos")
      }
    });
})
