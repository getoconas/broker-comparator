# 📈 Comparador de Brokers Argentinos

Una calculadora financiera interactiva construida con **Angular** y **TailwindCSS**. Esta herramienta permite a los inversores comparar en tiempo real los costos totales (comisiones, derechos de mercado e IVA) de operar Acciones y CEDEARs en los principales brokers de Argentina.

## 🚀 Características

* **Cálculo en Tiempo Real:** Ingresá la cantidad nominal y el precio unitario, y la plataforma calcula automáticamente el costo total estimado.
* **Ordenamiento Dinámico:** Los resultados se ordenan automáticamente de menor a mayor costo, destacando visualmente la opción más económica.
* **Costos Transparentes:** Desglosa el monto de inversión puro de los gastos asociados (comisiones base, derechos de mercado fijos/variables e IVA).
* **Arquitectura Escalable:** Los datos de los brokers se consumen desde un archivo JSON tipado, lo que permite agregar nuevos agentes, actualizar tarifas o migrar a una base de datos externa de forma sencilla y sin alterar la lógica de los componentes.
* **Diseño Responsive:** Interfaz moderna y fluida adaptada para dispositivos móviles y de escritorio.

## 🛠️ Tecnologías Utilizadas

* [Angular](https://angular.dev/) (Standalone Components, Control Flow)
* [TailwindCSS v4](https://tailwindcss.com/)
* TypeScript
* HTML5 / SCSS

## 📦 Instalación y Uso Local

Para correr este proyecto en tu entorno local, asegurate de tener [Node.js](https://nodejs.org/) y Angular CLI instalados.

1. Cloná el repositorio:
   git clone https://github.com/getoconas/broker-comparator.git

2. Navegá al directorio del proyecto:
   cd broker-comparator

3. Instalá las dependencias:
   npm install

4. Levantá el servidor de desarrollo:
   ng serve

5. Abrí en el navegador

## 🗺️ Roadmap (Próximos Pasos)

* [ ] Agregar logotipos e isologotipos de cada broker en las tarjetas.
* [ ] Incorporar más agentes de liquidación (ALYCs) al archivo de datos.
* [ ] Sumar un selector (toggle) para calcular costos de instrumentos exentos de IVA (ej. Bonos, Obligaciones Negociables).
* [ ] Migrar el listado estático JSON a una base de datos en la nube.

## 🤝 Contribuciones

Las contribuciones, reportes de bugs y sugerencias de nuevas características (pull requests) son siempre bienvenidas. Si las tarifas de algún broker se actualizan, sentite libre de proponer el cambio en el archivo `brokers.json` o abrir un issue.