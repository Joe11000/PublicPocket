$(function(){

  { // #side_col has fixed positioning on large; else normal bootstrap positioning
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
  }


  { // toggle .hide on .list-group-item on click to change visibility
    $(".list-group-item").each(function()
    {
      $(this).click(function(){
        if($(this).hasClass("active"))
        {
          $(this).removeClass("active");                                 // deselect the side_col item
          id = "#" + this.text.match(/\W*(\w+)/)[1].toLowerCase() + "_table"   // hide cooresponding table
          $(id).addClass("hide")
        }
        else
        {
          $(this).addClass("active");                                   // hide cooresponding table
          id = "#" + this.text.match(/\W*(\w+)/)[1].toLowerCase() + "_table"
          $(id).removeClass("hide")
        }
      })
    })
  }
})
