# Bitácora de uso de IA

## Herramientas que usé
- Antigraviy, Google Gemini

## Prompts clave (3 a 5)
| # | Fase | Prompt | Qué obtuve |
|---|---|---|---|
| 1 | Fase 1 | [config.yaml](file;file:///Users/macuser/Documents/technical-test/keppri-challenge/openspec/config.yaml) Crea la estructura del confin.yaml donde el contexto es: App mobile en react native para el agendamiento de clases grupales en un gimnasio,  este proyecto tendra integrada arquitectura limpia (estrictua),  clean code, SOLID. enfocada offlineFirst con manejo de estado local con AsyncStorage. especidicar estructura de carpetas segun la arquitectura y como correr pruebas  | Archivo config.yaml |
| 2 | Fase 2 | Lee el archivo insumo-funcional/insumo_funcional_ClaseFit.md y genera los artefactos para el cambio add-class-booking de OpenSpec cumpliendo las siguientes reglas:

proposal.md: Debe incluir Why, What Changes, Impact y Out of Scope.

specs/class-booking/spec.md: Debe cubrir en formato BDD (Given-When-Then) las 4 reglas de negocio (RN-01 a RN-04).

design.md: Debe ser breve, definir la arquitectura en 3 capas (Domain, Data, Presentation), el cálculo de fechas, el manejo del estado offline/memoria y 1 alternativa descartada.

tasks.md: Lista de tareas pequeñas agrupadas por capas (Domain -> Data -> Presentation -> Tests)." | carpetas add-class-booking |




## Errores de la IA que detecté
| # | Qué hizo mal | Cómo lo detecté | Cómo lo resolví |
|---|---|---|---|
| 1 | El archivo config.yaml se creo con reglas para syncronizacion de datos al recuperar la red. | Al leer el archivo con sus reglas note que no cumplia con lo pedido en el prompt, agrego reglas de syncronizacion de datos al recuperar la red que no debia estar en el archivo,  | Edite el archivo config.yaml para que cumpliera con lo pedido en el prompt. |
| 2 | | |


## Resultado de `openspec validate`
```
✔ What would you like to valid
ate? All (changes + specs)
✓ spec/class-booking
Totals: 1 passed, 0 failed (1 items)
```
