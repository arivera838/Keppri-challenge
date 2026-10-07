# Preguntas de reflexión · Desarrollador React Native espartano

Copia este archivo como `respuestas_reflexion.md` en tu repositorio y responde con tus propias palabras. Puedes apoyarte en la IA para ordenar ideas, pero queremos **tu** opinión. De 3 a 5 líneas por pregunta es suficiente.

---

### 1. ¿Qué experiencia previa tenías usando OpenSpec o SDD?

No cuento con experiencia profesional previa aplicando SDD (Spec-Driven Development) en entornos corporativos, pero en los últimos 4 meses me he enfocado de manera autónoma en estudiarlo a fondo mediante recursos teóricos y prácticos.

Para consolidar el aprendizaje, lo he implementado activamente en mis proyectos personales. Recientemente descubrí OpenSpec y coincidir con su uso en esta prueba me permitió validar de primera mano su efectividad: considero que es una herramienta ideal para estructurar esta metodología, ya que aporta claridad y alineación desde la fase inicial de desarrollo.

### 2. ¿Cómo crees que cambia el rol de desarrollador React Native antes y después de conocer y aplicar este framework?

El cambio principal radica en la responsabilidad técnica inicial y en la claridad de la visión de negocio antes de la implementación:

Antes de la metodología: El desarrollador solía trabajar con requerimientos más ambiguos o prototipos incompletos. Esto permitía avanzar rápido al inicio, pero solía generar bastantes reprocesos, desacuerdos de reglas de negocio en pleno desarrollo o bugs al no considerar todos los escenarios.*

Después de conocer y aplicar SDD / OpenSpec: El desarrollador React Native asume un rol mucho más analítico y estructurado. Debe definir claramente las reglas de negocio, los estados de la interfaz y los casos de borde (edge cases) en una especificación antes de programar.*

En un contexto donde nos apoyamos en herramientas de IA, este cambio es fundamental: un desarrollo estricto impulsado por IA depende 100% de la calidad del contexto y la especificación. Al dedicar más tiempo al análisis previo, la ejecución en React Native resulta mucho más precisa, limpia y sin reprocesos.

### 3. ¿Cómo crees que debería trabajar ahora un equipo que usa esta metodología?

Un equipo que adopta SDD (Spec-Driven Development) debe evolucionar hacia una colaboración más estrecha y simbiótica entre Producto y Desarrollo desde las etapas iniciales:

Co-creación y contexto de negocio: Desarrollo no espera a recibir un requerimiento cerrado. Trabaja junto a Producto para entender el 'por qué' de la feature, aportando perspectiva técnica al definir el valor de negocio y los criterios de aceptación.

Historias de Usuario rigurosas: El refinamiento se vuelve un proceso serio y detallado. Las Historias de Usuario dejan de ser enunciados generales para convertirse en documentos ricos en contexto, escenarios y casos de borde.

Especificación como contrato técnico: Antes de escribir código, se define la especificación (usando herramientas como OpenSpec). Esto alineará las expectativas del negocio, los flujos de interfaz y la arquitectura del sistema.

Desarrollo acelerado por IA: Con la especificación acordada y detallada, la fase de codificación —apoyada en IA— se vuelve mucho más ágil, predecible y con un margen mínimo de reproceso.

### 4. ¿Qué ventajas y desventajas ves?

🟢 Ventajas
Desarrollo acelerado y preciso con IA (Ventaja Principal): Al contar con un 'contrato' explícito, la IA genera código, componentes en React Native y pruebas sin alucinar arquitectura, reglas de negocio o flujos no deseados. Se reduce drásticamente el tiempo de implementación y la refactorización innecesaria.

Orden y alineación en el equipo: Tanto Producto como Desarrollo comparten la misma fuente de verdad (Single Source of Truth), lo que evita malentendidos sobre qué se debe construir.

Criterios de aceptación claros: Los escenarios y casos de borde se resuelven en la fase de especificación y no en medio de la fase de codificación.

🔴 Desventajas y Desafíos
Evolución y reestructuración de la Spec (Desafío Principal): En proyectos reales es casi imposible anticipar el 100% de los casos o reglas desde el día uno. Descubrir un flujo omitido en pleno desarrollo implica pausar, actualizar la especificación y redefinir las reglas antes de continuar codificando.

Curva de aprendizaje inicial y fricción: Adaptar al equipo a escribir y revisar especificaciones detalladas antes de tocar código puede sentirse lento al principio, especialmente si se está acostumbrado a iterar sobre la marcha.

### 5. ¿Cuándo usarías y cuándo no usarías este método?
🔴 Cuándo NO lo usaría
Pruebas de Concepto (PoC) y Prototipos Rápidos: En etapas donde la prioridad es validar una idea en días y el código es desechable, el flujo estricto de especificación genera demasiada fricción innecesaria.

Scripts, Automatizaciones Breves o Utilidades Internas: Tareas puntuales o pequeñas automatizaciones no requieren formalizar un contrato técnico ni definir reglas complejas de negocio.

Proyectos con requerimientos extremadamente volátiles a corto plazo: Si las reglas de negocio cambian a diario por descubrimiento inicial de cliente, mantener la spec al día puede convertirse en un cuello de botella antes de encontrar la dirección correcta.

🟢 Cuándo SÍ lo usaría
Proyectos Nuevos (Greenfield) con Proyección de Escalabilidad: Es el escenario ideal. Definir las especificaciones y reglas desde el día uno permite construir una arquitectura sólida en React Native, acelera exponencialmente el desarrollo con IA y deja una fuente de verdad (Single Source of Truth) para el equipo a futuro.

Proyectos Existentes (Legacy o en Crecimiento): Lo aplicaría para features o módulos nuevos de alta complejidad, pero con una condición indispensable: trabajar de la mano con Producto para definir las reglas de negocio y los bordes de la especificación, asegurando que no rompamos comportamientos previos del sistema.

Sistemas con Reglas de Negocio Complejas: Donde los casos de borde (edge cases) o múltiples estados de interfaz impactan directamente la experiencia del usuario o la consistencia de los datos.