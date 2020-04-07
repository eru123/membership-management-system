function notify(){
  console.log('requesting notif permission');
  Notification.requestPermission().then(function(result){
    console.log('allow')
    var notif = new Notification('Electron Notification',{
      'body':'Hi this is notification',
      'icon':'favicon.png'
    })
  })
}
function _(s){
  return document.querySelector(s);
}
function scrollPrompt(id){
   document.getElementById(id).scrollTop += 10;
}
function scrollToBottom(id,delay = 0.1){
  var element = document.getElementById(id);
  setTimeout(function(){
    element.scrollTop = element.scrollHeight + element.clientHeight;
  },delay * 1000)
}
function stheme(s = 'primary'){
  r = {
    color : 'rgb(0, 123, 255)',
    subcolor : 'rgba(0, 123, 255,0.2)'
  }
  if (s == 'dark' || s == 'black' || s == 'night') {
    r.color = 'rgb(52, 58, 64)';
    r.subcolor = 'rgba(52, 58, 64,0.2)';
  } else if (s == 'danger' || s == 'red' || s == 'blood' || s == 'tomato') {
    r.color = 'rgb(220, 53, 69)';
    r.subcolor = 'rgba(220, 53, 69,0.2)';
  } else if (s == 'success' || s == 'green' || s == 'nature' || s == 'safe') {
    r.color = 'rgb(40, 167, 69)';
    r.subcolor = 'rgba(40, 167, 69,0.2)';
  } else if (s == 'info' || s == 'information' || s == 'note') {
    r.color = 'rgb(23, 162, 184)';
    r.subcolor = 'rgba(23, 162, 184,0.2)';
  } else if (s == 'gray' || s == 'lightgray' || s == 'darkgray') {
    r.color = 'rgb(128, 128, 128)';
    r.subcolor = 'rgba(128, 128, 128,0.2)';
  } else if (s == 'teal' || s == 'frog') {
    r.color = 'rgb(0, 128, 128)';
    r.subcolor = 'rgba(0, 128, 128,0.2)';
  } else if (s == 'orange' || s == 'orangesun' || s == 'sun') {
    r.color = 'rgb(253, 126, 20)';
    r.subcolor = 'rgba(253, 126, 20,0.2)';
  } else if (s == 'yellow' || s == 'sunny' || s == 'warning') {
    r.color = 'rgb(255, 193, 7)';
    r.subcolor = 'rgba(255, 193, 7,0.2)';
  } else if (s == 'indigo' || s == 'eggplant') {
    r.color = 'rgb(102, 16, 242)';
    r.subcolor = 'rgba(102, 16, 242,0.2)';
  } else if (s == 'purple' || s == 'violet') {
    r.color = 'rgb(111, 66, 193)';
    r.subcolor = 'rgba(111, 66, 193,0.2)';
  }
  return r;
}
function sgraph(id,title,labels,datas,type = 'bar',color = 'primary'){
  var ctx = document.getElementById(id).getContext('2d');
  var theme = stheme(color)
  var chart = new Chart(ctx, {
      type: type,
      data: {
          labels: labels,
          datasets: [{
              label: title,
              data: datas,
              backgroundColor: theme.subcolor,
              borderColor: theme.color,
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
  return chart;
}
function cgraph(id,labels,datac,type = 'bar'){
  var ctx = document.getElementById(id).getContext('2d');
  var theme = stheme('primary');
  var datas = [];
  datac.forEach(({title,data,color})=>{
    theme = color ? stheme(color) : stheme('primary');
    datas.push({
        label: title,
        data: data,
        backgroundColor: theme.subcolor,
        borderColor: theme.color,
        borderWidth: 1
    });
  });

  var chart = new Chart(ctx, {
      type: type,
      data: {
          labels: labels,
          datasets: datas
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
  return chart;
}
function udgraph(chart, data,i = 0) {
  var l = data.length;
  chart.data.datasets[i].data = data;
  chart.update();
}
function udsgraph(chart, data) {
  var l = data.length;
  chart.data.datasets[0].data = data;
  chart.update();
}
function udcgraph(chart, data) {
  for (var n = 0; n < data.length; i++) {
    chart.data.datasets[n].data = data[n];
  }
  chart.update();
}
function lid(n = false){
  var lid = localStorage.getItem('lid') ?? 0;
  if (n) {
    lid++;
  }
  localStorage.setItem('lid',lid);
  return lid;
}
function setupFormProccess(){
  user = app._data.setupForm.user;
  name = app._data.setupForm.name;
  pass = app._data.setupForm.pass;
  cpass = app._data.setupForm.cpass;
  ec = 0;
  em = "";


  if (user == null || user == "") {
    ec++;
    em += "Invalid username. ";
  } else if (user.length < 3) {
    ec++;
    em += "Username is too short. ";
  } else if (user.length > 36) {
    ec++;
    em += "Username is too long. ";
  }

  if (name == null || name == "") {
    ec++;
    em += "Invalid name. ";
  } else if (name.length < 2) {
    ec++;
    em += "Name is too short. ";
  } else if (name.length > 36) {
    ec++;
    em += "Name is too long. ";
  } else {
    name = name.toLowerCase();
  }

  if (pass == null || pass == "") {
    ec++;
    em += "Invalid Password. ";
  } else if (pass.length < 4) {
    ec++;
    em += "Password is too short. ";
  } else if (pass.length > 1000) {
    ec++;
    em += "Password is too long. ";
  } else if (pass != cpass) {
    ec++;
    em += "Password does not match. ";
  }

  if (ec == 0) {
    Swal.fire('SUCCESS','You are now set, go to login now','success');
    app._data.setupForm.accept = true;
    localStorage.setItem('setupForm',JSON.stringify(app._data.setupForm));
    app._data.setup = false;
    app._data.start = 'login';
    app._data.settings.login = true;
    app._data.setupForm.accept = true;
  } else {
    Swal.fire('ERROR',em,'error');
  }
}
function epop(a,i,l = 1){
  return a.splice(i,l);
}
function initSetup(x = false){
  if (x == true) {
    var setupForm = JSON.parse(localStorage.getItem('setupForm') ?? "[]");
    app._data.setup = false;
    app._data.setupForm = setupForm;
    app._data.loginForm.login = true;
    app._data.start = 'app';
  } else {
    var setupForm = JSON.parse(localStorage.getItem('setupForm') ?? "[]");
    if (setupForm.accept == true || setupForm.accept == 'true') {
      app._data.setup = false;
      app._data.start = 'login';
      app._data.setupForm = setupForm;
    }
  }
  syncMemberFromLocal();
  updateRecentMembers();
}
function login(){
  if (app._data.setupForm.user == app._data.loginForm.user && app._data.setupForm.pass == app._data.loginForm.pass) {
    app._data.loginForm.login = true;
    app._data.loginForm.user = "";
    app._data.loginForm.pass = "";
    app._data.start = 'app';
    Swal.fire('LOGIN','Enjoy using our platform :)','success');
  } else {
    Swal.fire('INVALID','Invalid Credentials','error');
  }
  updateRecentMembers();
}
function logout(){
  Swal.fire({
    title: 'Are you sure you want to logout?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, log me out!'
  }).then((result) => {
    if (result.value) {
      app._data.setup = false;
      app._data.start = 'login';
      Swal.fire(
        'Logout!',
        'You have been logout',
        'success'
      )
    }
  })
}
function countries(){
  return ["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Brazil","Brunei","Bulgaria","Burkina Faso","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Congo (Brazzaville)","Congo (Kinshasa)","Costa Rica","Cote d'Ivoire","Croatia","Diamond Princess","Cuba","Cyprus","Czechia","Denmark","Djibouti","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Guatemala","Guinea","Guyana","Haiti","Holy See","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Korea, South","Kuwait","Kyrgyzstan","Latvia","Lebanon","Liberia","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malaysia","Maldives","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Morocco","Namibia","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Macedonia","Norway","Oman","Pakistan","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Lucia","Saint Vincent and the Grenadines","San Marino","Saudi Arabia","Senegal","Serbia","Seychelles","Singapore","Slovakia","Slovenia","Somalia","South Africa","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Taiwan*","Tanzania","Thailand","Togo","Trinidad and Tobago","Tunisia","Turkey","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","US","Uzbekistan","Venezuela","Vietnam","Zambia","Zimbabwe","Dominica","Grenada","Mozambique","Syria","Timor-Leste","Belize","Laos","Libya","West Bank and Gaza","Guinea-Bissau","Mali","Saint Kitts and Nevis","Kosovo","Burma"];
}
function syncMemberFromLocal(){
  data = localStorage.getItem('members') ?? "[]";
  app._data.members.data = JSON.parse(data);
  updateRecentMembers();
}
function updateMemberLocal(data){
  localStorage.setItem('members',JSON.stringify(data));
}
function addMember(){
  var gender = app._data.members.tmpdata.gender ?? 'other';
  var fname = app._data.members.tmpdata.fname;
  var lname = app._data.members.tmpdata.lname;
  var country = app._data.members.tmpdata.country ?? 'Philippines';
  var address = app._data.members.tmpdata.address;
  var email = app._data.members.tmpdata.email;
  var phone = app._data.members.tmpdata.phone;
  var website = app._data.members.tmpdata.website;
  var description = app._data.members.tmpdata.description;
  var attachment = localStorage.getItem('tmp_gid') ?? "";
  var ec = 0;
  var em = "";


  if (lname == null || lname == "") {
    ec++;
    em = "Invalid last name. ";
  } else if (lname.length < 2) {
    ec++;
    em = "Last name is too short";
  } else if (lname.length > 36) {
    ec++;
    em = "Last name is too long";
  } else {
    lname = lname.toLowerCase();
  }

  if (fname == null || fname == "") {
    ec++;
    em = "Invalid first name. ";
  } else if (fname.length < 2) {
    ec++;
    em = "First name is too short";
  } else if (fname.length > 36) {
    ec++;
    em = "First name is too long";
  } else {
    fname = fname.toLowerCase();
  }

  if (ec == 0) {
    data = {
      id:lid(true),
      fname: fname,
      lname: lname,
      gender: gender,
      country: country,
      address: address,
      email: email,
      phone: phone,
      website: website,
      description: description,
      attachment: attachment
    };
    app._data.members.data.push(data);
    app._data.members.tmpdata.gender = "male";
    app._data.members.tmpdata.fname = "";
    app._data.members.tmpdata.lname = "";
    app._data.members.tmpdata.country = "Philippines";
    app._data.members.tmpdata.address = "";
    app._data.members.tmpdata.email = "";
    app._data.members.tmpdata.phone = "";
    app._data.members.tmpdata.website = "";
    app._data.members.tmpdata.description = "";
    app._data.members.tmpdata.attachment = "";
    localStorage.setItem('tmp_gid',"");
    document.getElementById('amgidp').src = "";
    updateMemberLocal(app._data.members.data);
    Swal.fire('SAVED','New member added!','success');
  } else {
    Swal.fire('INVALID',em,'error');
  }
  updateRecentMembers();
}
function viewMember(id){
  app._data.dash = "view";
  x = app._data.members.data;
  r = false;
  for (var i = 0; i < x.length; i++) {
    if (x[i].id == id) {
      app._data.dashview = x[i];
      app._data.dash = "view";
      r = true;
    }
  }
  if (r == false) {
    app._data.dash = "errorView"
  }
}
function genderAbbr(g){
  if (g == 'male' || g == 'Male' || g == 'MALE') {
    return "M";
  } else if (g == 'female' || g == 'Female' || g == 'FEMALE') {
    return "F";
  } else {
    return "O";
  }
}
function updateRecentMembers(){
  var data = app._data.members.data;
  if (data.length > 10) {
    for (var i = data.length; i > (data.length - 10); i--) {
      if (app._data.members.data[(i-1)] != null) {
        app._data.recentMembers.push(app._data.members.data[i]);
      }
    }
  } else if(data.length > 0) {
    for (var i = data.length; i > 0; i--) {
      if (app._data.members.data[(i-1)] != null) {
        app._data.recentMembers.push(app._data.members.data[i]);
      }
    }
  }
} 
function dbSyncVueLocal(){
  localStorage.setItem('members',JSON.stringify(app._data.members.data));
  updateRecentMembers();
}
function deleteMember(id){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      for (var i = 0; i < app._data.members.data.length; i++) {
        if (app._data.members.data[i].id == id) {
          epop(app._data.members.data,i);
          dbSyncVueLocal();
        }
      }
      app._data.dash = 'main';
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  });
  updateRecentMembers();
}
function gid(id){
  var img = document.getElementById(id).files;
  if (img != null && img.length == 1) {
    if (img[0].type != null && img[0].type.substr(0,5) == 'image') {
      var fr = new FileReader();
      fr.onload = function(e){
        setTimeout(function(){
          localStorage.setItem('tmp_gid',e.target.result);
        },20)
      }
      fr.readAsDataURL(img[0]);
    }
  }
  return false;
}
function lgid(id){
  var img = document.getElementById(id);
  d = localStorage.getItem('tmp_gid');
  img.src = d;
}
function amgid(){
  gid('amgid');
  setTimeout(function(){
    lgid('amgidp');
  },50)
}
function saveEPF(){
  if (app._data.editProfileForm != null && app._data.editProfileForm.id != null) {
    id = app._data.editProfileForm.id;
    for (var i = 0; i < app._data.members.data.length; i++) {
      if (app._data.members.data[i].id == id) {
        app._data.editProfileForm.attachment = localStorage.getItem('tmp_gid');
        app._data.members.data[i] = app._data.editProfileForm;
        app._data.dashview = app._data.editProfileForm;
        dbSyncVueLocal();
        localStorage.setItem('tmp_gid',"");
      }
    }
    app._data.dash = 'view';
    Swal.fire('Saved','Membership has been successfully updated','success');
  } else {
    Swal.fire('Failed to save','Unknown error occur','error');
  }
  updateRecentMembers();
}
function epfdp(){
  gid('epfdp');
  setTimeout(function(){
    lgid('epfdpi');
  },50)
}
function gotoEPF(){
  app._data.dash = 'edit';
  app._data.editProfileForm = app._data.dashview;
}
function syncSettingsApp(){
  app._data.settings = ((localStorage.getItem('setupForm') != null) ? JSON.parse(localStorage.getItem('setupForm')) : []);
}
function syncSettingsLocal(){
  localStorage.setItem('setupForm',JSON.stringify(app._data.settings));
}
function newName(){
  fname = document.getElementById('sedfn').value;
  lname = document.getElementById('sedln').value;

  app._data.settings.name = `${fname.toLowerCase()} ${lname.toLowerCase()}`;
  syncSettingsLocal();
  app._data.settp = 'main';
  Swal.fire('SUCCESS','User Full Name has been changed!','success');
}
function newUsername(){
  user = document.getElementById('sedun').value;
  pass = document.getElementById('sedunp').value;
  if (pass == app._data.settings.pass) {
    app._data.settings.user = user;
    syncSettingsLocal();
    app._data.settp = 'main';
    Swal.fire('SUCCESS','Username has been changed!','success');
  } else {
     Swal.fire('INVALID','The password you entered is incorrect','error');
  }
}
function newPassword(){
  op = document.getElementById('sedop').value;
  np = document.getElementById('sednp').value;
  cnp = document.getElementById('sedcnp').value;
  if (op == app._data.settings.pass) {
    if (np == cnp) {
      if (np.length >= 4) {
        app._data.settings.pass = np;
        syncSettingsLocal();
        app._data.settp = 'main';
        Swal.fire('SUCCESS','The Password has been changed!','success');
      } else {
        Swal.fire('INVALID','Invalid new password length','error');
      }
    } else {
      Swal.fire('INVALID','The new password does not match','error');
    }
  } else {
    Swal.fire('INVALID','The old password you entered is incorrect','error');
  }
}
function sedlToggle(){
  if (app._data.settings.login == true) {
    app._data.settings.login = false;
    Swal.fire('TURNED OFF','Login on application start has been disabled', 'success');
  } else {
    app._data.settings.login = true;
    Swal.fire('TURNED ON','Login on application start has been enabled', 'success');
  }
  syncSettingsLocal();
}