/* 
 * suncrop cloud plus
 */

/* called via

var script = document.createElement( 'script' );
script.type = 'text/javascript';
script.src = "https://assetsdev.sun.cloud/new-media/suncrop-cloud-plus/js/scp.js";
document.body.appendChild(script);

*/

resource_location="https://assetsdev.sun.cloud/new-media/suncrop-cloud-plus/";
resource_location="";

function we_have_the_technology() {
  return true;
}

if(we_have_the_technology()){
  // magic starts here

  // stage 2
  hide_legacy();
  //show_loading();
  data=get_instance_map()
  //remove_legacy()
  //  html and css

  build_suncloud_plus(data)



  // stage 1
  nice_ify_css();
  //add_metro();
  enable_legacy_menu();

  update_metro_menu(data);
  add_metro_events();
}

function hide_legacy() {
  $('.page').hide();
}

function build_suncloud_plus(data) {
  var suncorpplus='<div id="suncloudplus" class="metrouicss"> \
    <div id="scp_header"></div> \
    <div id="scp_body"></div> \
    <div id="scp_footer"></div> \
  </div>';
  $('body').prepend(suncorpplus);

  build_header();
  build_body(data);
  build_footer();
}
function build_body(site_map) {
  var heading="";
  $('#scp_body').append(heading);
  // split map into regions.

  var accordion= '<ul class="accordion dark" data-role="accordion">'+'</ul>';
  $('#scp_body').append(accordion);

  var accordion_li = new Array();
  // print list. li = region. data(s) = site
  $('.main h2').each(function() {
    var environment=$(this).text();
    var environment_cleaned=environment.replace(/\s/g, '_');

    // this isn't an efficient way of adding data to the accordions
    var accordion_data = new Array();
    // print list. li = region. data(s) = site
    for(i in site_map) {
      if(site_map[i].region === environment) {
      console.log('-----------');console.log(site_map[i].region);console.log(environment);
        accordion_data.push('<div data-site="'+site_map[i].name+'">'+site_map[i].name+'</div>');
        //console.log('-----------');console.log(accordion_data);
      }
      $('.'+environment_cleaned+' .accordion_data').append(accordion_data);
    }

    accordion_li.push('<li class="active '+environment_cleaned+'"><a>'+environment+'</a><div class="accordion-container">'+accordion_data+'</div></li>');
       // console.log('######################');console.log(accordion_li);
  })


  $('#scp_body ul').css({'margin': '0 60px 0 120px'}).append(accordion_li);
}
function build_footer() {}

/***********************************************
 * nice_ify_css()
 ************************************************/
function nice_ify_css() {
  $('body').css({'background':'#fff'})
  $('.page').css({
    'border':'none',
    'margin':'0',
    'width':'100%'
  });
  $('h2').css({'margin':'0'});
  $(".header .hideSkiplink ").hide();
  $("div.div-list ul").css("display","block").css("width","100%");
  $("drupal_tools_site_selector select").css("float","left");
  $('#drupal_tools div').css({
    'background-color':'#2C3F6A',
    'color':'#FFFFEA',
    'display':'block',
    'line-height':'1.70em',
    'padding':'2px 10px',
    'white-space':'nowrap',
    'text-decoration':'none'
  });
  $('.waiting').hide();
}

/***********************************************
 * add_metro()
 ************************************************/
function build_header() {
  add_metro_menu();
  add_metro_heading();
}

function add_metro_menu() {
  $('body').append(get_metro_menu_assets());
  $('#scp_header').append(get_metro_menu_html());
}

function get_metro_menu_assets() {
  assets='<link href="'+resource_location+'css/modern.css" rel="stylesheet"> \
    <script type="text/javascript" src="'+resource_location+'js/lib/jquery-1.8.3.min.js"></script> \
    <script type="text/javascript" src="'+resource_location+'js/dropdown.js"></script> \
    <script type="text/javascript" src="'+resource_location+'js/accordion.js"></script>';
   return assets;
}

function get_metro_menu_html() {
  var menu_html = '\
    <div class="nav-bar"> \
      <div class="nav-bar-inner"> \
        <a href="#"> \
          <span class="element brand">Suncrop Cloud</span> \
        </a> \
        <span class="divider"></span> \
        <ul class="menu" style="overflow:visible;"> \
        <!-- this probably doesnt need to be hard coded --> \
          <li class="legacy-dash legacy-link" data-name="ctl00$MenuContent$_showProjectDeployments"><a href="#">Project Dashboard</a></li> \
          <li class="legacy-details legacy-link" data-name="ctl00$MenuContent$_showProjectDetails"><a href="#">Project Details</a></li> \
          <li class="legacy-res legacy-link" data-name="ctl00$MenuContent$_showResourceDetailsButton"><a href="#">Project Resources</a></li> \
          <li class="legacy-wiz legacy-link" data-name="ctl00$MenuContent$_showDeploymentWizard"><a href="#">Request Wizard</a></li> \
          <li data-role="dropdown" class="sites show-sites"> \
            <a>Sites</a> \
            <ul class="dropdown-menu" style="display:none;"> \
              <li class="all_sites"><a href="#">All Sites</a></li> \
              <li class="divider"></li> \
              <li class="loading"><a href="#">SITES</a></li> \
            </ul> \
          </li> \
          <li data-role="dropdown" class="ports show-ports"> \
            <a>Ports</a> \
            <ul class="dropdown-menu" style="display:none;"> \
              <li class="all_ports"><a href="#">All Ports</a></li> \
              <li class="divider"></li> \
              <li class="loading"><a href="#">PORTS</a></li> \
            </ul> \
          </li> \
          <li data-role="dropdown" class="hosts show-hosts"> \
            <a>Hosts</a> \
            <ul class="dropdown-menu" style="display:none;"> \
              <li class="all_hosts"><a href="#">All Hosts</a></li> \
              <li class="divider"></li> \
              <li class="loading"><a href="#">HOSTS</a></li> \
            </ul> \
          </li> \
          <li data-role="dropdown" class="versions show-versions"> \
            <a>Versions</a> \
            <ul class="dropdown-menu" style="display:none;"> \
              <li class="all_versions"><a href="#">All Versions</a></li> \
              <li class="divider"></li> \
              <li class="loading"><a href="#">VERSIONS</a></li> \
            </ul> \
          </li> \
        </ul> \
      </div> \
    </div>';
  return menu_html;
}

function add_metro_heading() {
  var page_heading=$('#ctl00_TitleContent__projectNameLabel').text();
  var metro_header='<div class="page-header-content"><h1>'+page_heading+'</h1><a href="/" class="back-button"></a></div>';
  $('#scp_body').prepend(metro_header);
  $('.page-header-content').css({
    'position': 'relative',
    'height': '100px',
  }).find('h1').css({
    'position': 'absolute',
    'margin': '0',
    'padding': '0',
    'left': '120px',
    'bottom': '0',
    'font-family': "'Segoe UI Light', 'Open Sans', Verdana, Arial, Helvetica, sans-serif",
    'font-weight': '200',
    'font-size': '42pt',
    'letter-spacing': '0.00em',
    'line-height': '65pt',
    'font-smooth': 'always',
    'color': '#000000'
  });
  $('.back-button').css({
    'background':'url(/img/back.png) no-repeat 35px 35px',
    'display':'block',
    'height':'100px',
    'width':'100px'
  });
  $('.nav-bar').css({'padding':'10px'});
}

//function remove_legacy_header(){
//  $('.header').remove();
//}

/***********************************************
 * enable_legacy_menu()
 ************************************************/
function enable_legacy_menu() {
  $('.legacy-link a').click(function() {
    var input_name = $(this).attr('data-name');
    $('[name="'+input_name+'"]').click();
  });
}

/***********************************************
 * update_metro_menu()
 ************************************************/

function update_metro_menu(site_map) {
  function update_sites_list(site_map) {
    var list_html=update_list_helper(site_map, 'name');
    $('.menu .sites ul').append(list_html);
    $('.menu .sites ul li.loading').remove();
  }

  function update_ports_list(site_map) {
    var list_html=update_list_helper(site_map, 'port');
    $('.menu .ports ul').append(list_html);
    $('.menu .ports ul li.loading').remove()
  }
  function  update_hosts_list(site_map) {
    var list_html=update_list_helper(site_map, 'host');
    $('.menu .hosts ul').append(list_html)
    $('.menu .hosts ul li.loading').remove();
  }

  function update_list_helper(site_map, list_type) {
    var list_html=new Array();

    for(site in site_map) {
      if(site_map[site][list_type]) {
        list_html.push('<li class="'+site_map[site][list_type]+'"><a href="#">'+site_map[site][list_type]+'</a></li>');
      }
    }
    list_html.sort();

    return list_html;
  }

  update_sites_list(site_map);
  update_ports_list(site_map);
  update_hosts_list(site_map);
}

function get_instance_map() {
  var map = {
    data : {
      region : new Array()
    },
    sites : {}
  };

  $('.div-list td').each(function(index, element) {
    var site_name=$(element).find('strong:first').text()
    if(site_name != "") {
      var href=$(element).find('a').attr('href');
      var environment=$(element).parents('.div-list').parent().find('h2 span').text();
      if(typeof href != "undefined") {
// split into type? env.split[2]..?
        var region = environment.split('-')[0].trim();
        var instance = {
          name: site_name,
          port: href.split(':')[2],
          host: href.split(':')[1].split('/')[2],
          url: href,
          environment: environment,
          region: region
        }

        map.data.region[region]=region;
        map.sites[instance.port]=instance;
      }
    }
  });
 console.log(map)
  return map;
}

/***********************************************
 * update_metro_menu()
 ************************************************/
function add_metro_events() {
  // show all instances for a single site
  function show_sites(site_name) {
    $('ul li').show();

    if(site_name == "all_sites") {return;}
    
    $('.div-list td').each(function(index, element) {
      if($(element).find('strong:first').text() != site_name && $(element).find('strong:first').text() != "") {
        $(this).parent().parent().parent().parent().parent().hide();
      }
    });
  }

  // show all instances for a single port
  function show_ports(site_port) {
    $('ul li').show();

    if(site_port == "all_ports") {return;}
    
    $('.div-list td a').each(function(index, element) {
      if($(this).attr('href').split(':')[2] != site_port) {
        $(this).parent().parent().parent().parent().parent().parent().parent().hide();
      }
    });
  }

  // show all instances for a single port
  function show_hosts(site_host) {
    $('ul li').show();

    if(site_host == "all_hosts") {return;}
    $('.div-list td a').each(function(index, element) {
      if($(this).attr('href').split(':')[1].split('/')[2] != site_host) {
        $(this).parent().parent().parent().parent().parent().parent().parent().hide();
      }
    });
  }

  $('.show-sites li a').click(function() {
    show_sites($(this).parent().attr('class'));
  });

  $('.show-ports li a').click(function() {
    show_ports($(this).parent().attr('class'));
  });

  $('.show-hosts li a').click(function() {
    show_hosts($(this).parent().attr('class'));
  });
}


/************************************************/







// tools bar
function create_toolbar() {

  var drupal_tools='<ul class="drupal_tools">'+create_sites_tool() + create_ports_tool() + '</ul>';

  $('.menu .level1').append(drupal_tools);
}

function create_sites_tool() {
  var dt_options;
  
  for (site in get_sites()) {
    dt_options+='<li data-site="'+site+'"><a href="#">'+site+'</a></li>';
  };

  var site_selector='<ul id="dt_site_selector">' + dt_options + '</ul>';
  var site_selector_scripts="<script>$('#dt_site_selector').change(function() {show_site($('#dt_site_selector').val()); reset_selector('dt_site_selector')});</script>"

  return site_selector+site_selector_scripts;
}

function reset_selector(not_id) {
  $('.drupal_tools div select[id!="'+not_id+'"]').each(function() {
    $(this).find('option:first').attr('selected', 'true');
  });
}

function create_ports_tool() {
  var dt_options;

  for (port in get_ports()) {
    dt_options+='<li data-site="'+port+'"><a href="#">'+port+'</a></li>';
  };

  var port_selector='<ul id="dt_port_selector">' + dt_options + '</ul>';
  var port_selector_scripts="<script>$('#dt_port_selector').change(function() {show_port($('#dt_port_selector').val());reset_selector('dt_port_selector')});</script>"

  return port_selector+port_selector_scripts;
}


