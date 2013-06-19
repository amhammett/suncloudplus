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
var data;

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

  build_suncloud_plus()



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

function build_suncloud_plus() {
  var suncorpplus='<div id="suncloudplus" class="metrouicss"> \
    <div id="scp_header"></div> \
    <div id="scp_body"></div> \
    <div id="scp_footer"></div> \
  </div>';
  $('body').prepend(suncorpplus);

  build_header();
  build_body();
  build_footer();
}
function build_body() {
  var heading="";
  $('#scp_body').append(heading);
  // split map into regions.

  var accordion_lis='';
  var li_data='';

  for(i in data.regions) {
    var region= data.regions[i];

    for (j in data.instances) {
      var site = data.instances[j];

      if(site.region==region) {
        li_data+='<div class="tile" data-sites="'+site.site+'"><a href="'+site.url+'"> \
            <span class="site"> '+ site.site +' </span> \
            <span class="host"> '+ site.host +' </span> \
            <span class="port"> '+ site.port +' </span> \
            <span class="status"> '+ site.status +' </span> \
          </a></div>';
      }
    }
    accordion_lis+='<li class="active '+region+'"><a>'+region+'</a> \
        <div>'+li_data+'<div class="clear"></div></div> \
      </li>';
  }

  accordion = '<ul class="accordion dark" data-role="accordion">'+accordion_lis+'</ul>';

  $('#scp_body').append(accordion);
  $('#scp_body ul').css({'margin': '0 60px 0 120px'})
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
            <ul class="dropdown-menu" class="sites" style="display:none;"> \
              <li class="all_sites"><a href="#" data-sites="all_sites">All Sites</a></li> \
              <li class="divider"></li> \
              <li class="loading"><a href="#">SITES</a></li> \
            </ul> \
          </li> \
          <li data-role="dropdown" class="ports show-ports"> \
            <a>Ports</a> \
            <ul class="dropdown-menu" style="display:none;"> \
              <li class="all_ports"><a href="#" data-ports="all_ports">All Ports</a></li> \
              <li class="divider"></li> \
              <li class="loading"><a href="#">PORTS</a></li> \
            </ul> \
          </li> \
          <li data-role="dropdown" class="hosts show-hosts"> \
            <a>Hosts</a> \
            <ul class="dropdown-menu" style="display:none;"> \
              <li class="all_hosts"><a href="#" data-hosts="all_hosts">All Hosts</a></li> \
              <li class="divider"></li> \
              <li class="loading"><a href="#">HOSTS</a></li> \
            </ul> \
          </li> \
          <li data-role="dropdown" class="versions show-versions"> \
            <a>Versions</a> \
            <ul class="dropdown-menu" style="display:none;"> \
              <li class="all_versions"><a href="#" data-versions="all_versions">All Versions</a></li> \
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

function update_metro_menu() {
  function update_list_item(type) {
    var list_html=new Array();

    for(i in data[type]) {
      item=data[type][i];

      if(item) {
        list_html.push('<li><a href="#" data-'+type+'="'+item+'">'+item+'</a></li>');
      }
    }
    list_html.sort();

    $('.menu .'+type+' ul').append(list_html)
    $('.menu .'+type+' ul li.loading').remove();
  }

  for(i in {"sites":"sites", "ports":"ports", "hosts":"hosts", "versions":"versions"}) {
    update_list_item(i);
  }
}

function get_instance_map() {
  var map = {
    hosts : {},
    ports : {},
    regions : {},
    sites : {},
    instances : new Array(),
    versions : {}
  };

  $('.div-list td').each(function(index, element) {
    var site_name=$(element).find('strong:first').text()
    if(site_name != "") {
      var href=$(element).find('a').attr('href');
      var environment=$(element).parents('.div-list').parent().find('h2 span').text();
      var version = environment.split('-')[2].trim();

      if(typeof href != "undefined") {
        var region = environment.split('-')[0].trim();
        var status = "tbd";
        var instance = {
          site: site_name,
          port: href.split(':')[2],
          host: href.split(':')[1].split('/')[2],
          url: href,
          environment: environment,
          status: status,
          region: region,
          version: version
        }

        map.regions[region]=region;
        map.ports[instance.port]=instance.port;
        map.hosts[instance.host]=instance.host;
        map.sites[instance.site]=instance.site;
        map.instances.push(instance);
      }

      map.versions[version]=version;
    }
  });
 el(map)
  return map;
}

/***********************************************
 * update_metro_menu()
 ************************************************/
function add_metro_events() {
  // show all instances for a single site
  function show_sites(site_name) {
    $('.accordion .tile').show();

    if(site_name == "all_sites") {return;}
    
    $('.accordion .tile').each(function(index, element) {
      el($(element).attr('data-sites')+'> != <'+site_name)
      if($(element).attr('data-sites') != site_name) {
        $(element).hide();
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
    show_sites($(this).attr('data-sites'));
  });

  $('.show-ports li a').click(function() {
    show_ports($(this).parent().attr('class'));
  });

  $('.show-hosts li a').click(function() {
    show_hosts($(this).parent().attr('class'));
  });
}


/************************************************/



/*



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

*/

function el(s) {console.log(s);}