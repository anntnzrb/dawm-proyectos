# Proyecto #2

Diseñar e implementar una página web interactiva y adaptable que utilice las
tecnologías disponibles del lado del cliente.


<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [Proyecto #2](#proyecto-2)
    - [Lineamientos](#lineamientos)
    - [Referencias](#referencias)

<!-- markdown-toc end -->

## Lineamientos

Debe realizar una página web con un dashboard. Algunas consideraciones serán
revisadas en su página web:

- Utilice un marco de trabajo (framework) para la maquetación del sitio [1].
  - Se recomienda utilizar una plantilla gratuita de Material Design for
    Bootstrap (Enlaces a un sitio externo.), de ThemeWagon (Enlaces a un sitio
    externo.) o de cualquier otro sitio.
- Use alguna librería css para efectos.
- Incorpore gráficos (charts) con alguna librería, como ChartCSS (Enlaces a un
  sitio externo.), D3JS (Enlaces a un sitio externo.) o los charts de MDB
  (Enlaces a un sitio externo.).
- Uso de una fuente de datos externos
  - Consuma un API [4] [5] público, gratuito, sin autenticación (de
    preferencia) y que permita requerimientos cruzados, cuyo resultado sea un
    JSON o un XML, por ejemplo:
    - MathTools (Enlaces a un sitio externo.), de acuerdo con la documentación
      (Enlaces a un sitio externo.) puede obtener datos relacionados con el
      número del día (Enlaces a un sitio externo.).
    - CityBikes (Enlaces a un sitio externo.) muestra datos acerca de redes de
      bicicletas (Enlaces a un sitio externo.) y de una red en particular
      (Enlaces a un sitio externo.).
- Provea de un mecanismo para filtrar los datos que se muestran en el
  dashboard, por ejemplo:
  - El usuario selecciona un valor de una lista desplegable.
  - Automáticamente, con el valor seleccionado en la lista desplegable, se
    filtrarán los datos que se encuentran en una tabla, panel o gráfico.
  - Los valores de la lista como los de la tabla, panel o gráfico son cargados
    dinámicamente a partir de la fuente de datos externa.

## Referencias

- [GitHub - public-apis/public-apis](https://github.com/public-apis/public-apis)
- [ChartJS](https://www.chartjs.org)
