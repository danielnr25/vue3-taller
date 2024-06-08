<script setup>
import {ref, onMounted} from 'vue'
import { db } from './firebase'
import { collection, getDocs, onSnapshot, addDoc,deleteDoc,doc,updateDoc,query,orderBy,limit } from "firebase/firestore";


const collectionRef = collection(db,'todos');
const todoCollectionQuery = query(collectionRef,orderBy("date","desc"));

const todos = ref([]);

onMounted(() =>{
   onSnapshot(todoCollectionQuery, (querySnapshot) =>{ //onSnapshot
      const fbTodos = [];
      querySnapshot.forEach((doc)=>{
         const todo = {
            id: doc.id,
            nombre: doc.data().nombre,
            descripcion: doc.data().descripcion,
            completado: doc.data().completado,
            date: doc.data().date
         };
         fbTodos.push(todo);
      });
      todos.value = fbTodos;
   })
});

const newTodo = ref({
   nombre: '',
   descripcion: '',
   completado: false,

});

const addTodo = async () =>{
   const fechaActual = new Date();
   const dateformate = fechaActual.toISOString().slice(0, 10) + ' ' + fechaActual.toLocaleTimeString('en-GB');

   addDoc(collectionRef,{
      nombre: newTodo.value.nombre,
      descripcion: newTodo.value.descripcion,
      completado: newTodo.value.completado,
      date:dateformate
   });
   newTodo.value.nombre = '';
   newTodo.value.descripcion = '';
}

const deleteTodo = (id) =>{
   deleteDoc(doc(collectionRef,id));
}

const udpateTodo = (id) =>{
   const index = todos.value.findIndex(todo => todo.id === id);
   updateDoc(doc(collectionRef,id),{
      completado: !todos.value[index].completado
   })
}

</script>

<template>
   <div class="mx-auto max-w-7xl">
      <div class="py-8">
         <h1 class="text-center text-2xl font-bold uppercase text-green-800">Taller de Vue3 con Firebase</h1>
      </div>
      <div class="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8">
         <div class="mt-2 sm:mx-auto sm:w-full sm:max-w-sm shadow-lg px-4 py-4 rounded-md">
            <form class="space-y-6" @submit.prevent="addTodo()">
               <div>
                  <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                  <div>
                     <input 
                        type="text" 
                        name="name" 
                        id="nombre" 
                        v-model="newTodo.nombre"
                        class="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  </div>
               </div>

               <div>
                  <label for="descripcion" class="block text-sm font-medium leading-6 text-gray-900">Descripción</label>
                  <div>
                    <textarea 
                    name="descripcion"
                    id="descripcion"
                    v-model="newTodo.descripcion"
                    rows="3" 
                    class="block w-full rounded-md px-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                  </div>
               </div>
               <div>
                  <button 
                  :disabled="!newTodo.nombre || !newTodo.descripcion"
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                     Guardar
                  </button>
               </div>

            </form>
         </div>
      </div>

      <!-- Listado  -->
      <div class="bg-white py-14 sm:py-14">
         <div class="mx-auto max-w-7xl px-6 lg:px-8">
           <div class="mx-auto max-w-2xl lg:mx-0">
               <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Listado de Tareas</h2>
            </div>
            <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-700 pt-10 sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
               <article  
               v-bind:key="todo.id"
               v-bind:class="{'bg-green-100': todo.completado}"
               class="flex max-w-xl flex-col items-start justify-between shadow-xl p-6 rounded-lg transition-colors duration-200 ease-in-out transform"
               v-for="todo in todos"
               >
                  <div class="group relative">
                     <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <p 
                           class="block transition-colors duration-200"
                           :class="{'line-through': todo.completado}"
                           >
                           {{ todo.nombre }} - <span class="text-xs">{{todo.date}}</span>
                        </p>
                     </h3>
                     <p class="mt-5 text-sm leading-6 text-gray-600">
                        {{ todo.descripcion }}

                     </p>
                  </div>
                  <div class="relative mt-8 flex items-center justify-between gap-x-36">
                     <div class="flex items-center gap-x-2">
                        <input type="checkbox"
                        @click="udpateTodo(todo.id)"
                        v-model="todo.completado"
                        class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
                        <span class="text-sm font-medium leading-6 text-gray-900">Completado</span>
                     </div>
                     <button
                        @click="deleteTodo(todo.id)"
                        type="submit"
                        class="flex justify-center w-24 rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                     >
                     Eliminar
                     </button>
                  </div>
               </article>
            </div>


         </div>
      </div>

   </div>
</template>

