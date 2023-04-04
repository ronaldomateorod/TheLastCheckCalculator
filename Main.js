const form = document.querySelector('form');
const calculateButton = document.querySelector('#calculateButton');
const preAvisoResultDiv = document.querySelector('#preAvisoResult');
const cesantiaResultDiv = document.querySelector('#cesantiaResult');
const vacacionesResultDiv = document.querySelector('#vacacionesResult');
const navidadResultDiv = document.querySelector('#navidadResult');
const resultDiv = document.querySelector('#result');

calculateButton.addEventListener('click', event => {
  event.preventDefault();

  let startDate = new Date(form.elements.startDate.value);
  let endDate = new Date(form.elements.endDate.value);
  let salary = parseFloat(form.elements.salary.value);
  const quincenal = document.getElementById('quincenal');
  const mensual = document.getElementById('mensual');
  const preAviso = form.elements.preAviso.checked;

  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 
  + (endDate.getMonth() - startDate.getMonth());

  const antiguedad = months / 12;

  //Calculo de el salario diario dependiendo si es (Mensual o quincenal)
  let dailySalary = 0;

  if(quincenal.checked){
    dailySalary = salary / 11.91;
  }else{
    dailySalary = salary / 23.83;
  }

  //Calculo de censantia
  let cesantia = 0;

  if(months>=3 && months<6){
    cesantia = dailySalary * 6;
  }else if(months>=6 && antiguedad<1){
    cesantia = dailySalary * 13;
  }else if(antiguedad>=1 && antiguedad<5){
    cesantia = dailySalary * (Math.round(antiguedad) * 21);
  }else if (antiguedad>=5){
    cesantia = dailySalary * (Math.round(antiguedad) * 23);
  }

  //Calculo de preaviso
  let pre_Aviso = 0;

  if(!preAviso){
    if(months>=3 && months<=5){
      pre_Aviso = dailySalary * 7;
    }else if(months>=6 && months<=11){
      pre_Aviso = dailySalary * 14;
    }else if(antiguedad>=1){
      pre_Aviso = dailySalary * 28;
    }
  }else{
    pre_Aviso = 0;
  }

  //Calculo de vacaciones
  let vacaciones = 0;

  if(months>=5 && months<6){
    vacaciones = dailySalary * 6;
  }else if(months>=6 && months<7){
    vacaciones = dailySalary * 7;
  }else if(months>=7 && months<8){
    vacaciones = dailySalary * 8;
  }else if(months>=8 && months<9){
    vacaciones = dailySalary * 9;
  }else if(months>=9 && months<10){
    vacaciones = dailySalary * 10;
  }else if(months>=10 && months<11){
    vacaciones = dailySalary * 11;
  }else if(months==11 && antiguedad<1){
    vacaciones = dailySalary * 12;
  }else if(antiguedad>=1 && antiguedad<5){
    vacaciones = dailySalary * 14;
  }else if(antiguedad>=5 && antiguedad<10){
    vacaciones = dailySalary * 18;
  }

  //Calculo de salario de navidad
  let currentMonth = 0;
  let currentDay = 0;
  let navidad = 0;
  currentDay = (endDate.getUTCDate());
  currentMonth = (endDate.getUTCMonth());

  currentMonth += (currentDay / 30.44);

  navidad = (salary * (currentMonth) / 12);

  console.log(currentDay);
  console.log(currentMonth);

  // Mostrar el resultado
  let total = (cesantia + pre_Aviso + vacaciones + navidad);
  preAvisoResultDiv.textContent = `Preaviso es de RD$ ${pre_Aviso.toFixed(2)}`;
  cesantiaResultDiv.textContent = `Cesantia es de RD$ ${cesantia.toFixed(2)}`;
  vacacionesResultDiv.textContent = `Vacaciones es de RD$ ${vacaciones.toFixed(2)}`;
  navidadResultDiv.textContent = `Navidad es de RD$ ${navidad.toFixed(2)}`;
  resultDiv.textContent = `El último cheque es de RD$ ${total.toFixed(2)}`;
});