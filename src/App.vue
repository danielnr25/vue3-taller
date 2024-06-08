<script setup>

</script>

<template>
   <div class="mx-auto max-w-7xl">
      <div class="py-8">
         <h1 class="text-center text-2xl font-bold uppercase text-green-800">Taller de Vue3 con Firebase</h1>
      </div>
      <div class="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8">
         <div class="mt-2 sm:mx-auto sm:w-full sm:max-w-sm shadow-lg px-4 py-4 rounded-md">
            <form class="space-y-6" action="">
               <div>
                  <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                  <div>
                     <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        class="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  </div>
               </div>

               <div>
                  <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Descripción</label>
                  <div>
                    <textarea rows="3" 
                    class="block w-full rounded-md px-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                  </div>
               </div>
               <div>
                  <button>
                     Guardar
                  </button>
               </div>

            </form>
         </div>
      </div>

      <!-- Listado  -->
      <div>
         <div>
            <div>
               <h2>Listado</h2>
            </div>
            <div>
               <article>
                  <div>
                     <h3>
                        <p>Mi primer listado</p>
                     </h3>
                     <p>Descripción del listado</p>
                  </div>
               </article>
            </div>


         </div>
      </div>

   </div>
</template>

