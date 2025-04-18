import React from 'react'

const Empresa = () => {
  return (
    <div class="flex flex-col gap-5 w-full">
        <h1 className='text-4xl font-bold'>Empresa</h1>
        <p class="w-[700px]">La información que guardes acerca de tue empresa deberá ser lo más detallada posible, ya que, de esto dependerá como y sobre que se harán las predicciones a cerca de tu plan de comunicación</p>
        <div class="bg-white shadow-md rounded-2xl p-6 w-[700px]">
            <div class="flex flex-row gap-4 w-full">
                <div class="flex flex-col gap-2 mb-4 w-1/2">
                    <label htmlFor="nameCompany" class="font-medium">Nombre de la empresa:</label>
                    <input type="text" id='nameCompany' class="border-2 border-neutral-400 p-2 rounded-[5px] focus:outline-none focus:border-secondary-400"/>
                </div>
                <div class="flex flex-col gap-2 mb-4 w-1/2">
                    <label htmlFor="segment" class="font-medium">Segmento de mercado:</label>
                    <select name="Segmento de marcado" id="segment" class="border-2 border-neutral-400 p-2 rounded-[5px] focus:outline-none focus:border-secondary-400">
                    <option value="">Selecciona uno o varios</option>
                        <option value="1">Alimentos</option>
                        <option value="2">Finanzas</option>
                        <option value="2">Carros</option>
                        <option value="2">Bicis</option>
                    </select>
                </div>
            </div>
            <div class="flex flex-col gap-2 mb-4 w-full">
                <label htmlFor="location" class="font-medium">Dirección física:</label>
                <input type="text" id='location' class="border-2 border-neutral-400 p-2 rounded-[5px] focus:outline-none focus:border-secondary-400"/>
            </div>
            <div class="flex flex-row gap-4 w-full">
                <div class="flex flex-col gap-2 mb-4 w-1/2">
                    <label htmlFor="" class="font-medium">Propuesta de valor:</label>
                    <input type="text" class="border-2 border-neutral-400 p-2 rounded-[5px] focus:outline-none focus:border-secondary-400"/>
                </div>
                <div class="flex flex-col gap-2 mb-4 w-1/2">
                    <label htmlFor="" class="font-medium">Pùblico objetivo:</label>
                    <input type="text" class="border-2 border-neutral-400 p-2 rounded-[5px] focus:outline-none focus:border-secondary-400" />
                </div>
            </div>
            <div class="flex flex-col gap-2 mb-4 w-full">
                <label htmlFor="" class="font-medium">Descripciòn de servicios/productos</label>
                <input type="text" class="border-2 border-neutral-400 p-2 rounded-[5px] focus:outline-none focus:border-secondary-400" />
            </div>
            <div class="flex flex-col gap-2 mb-4 w-full">
                <label htmlFor="" class="font-medium">Competidores</label>
                <input type="text" class="border-2 border-neutral-400 p-2 rounded-[5px] focus:outline-none focus:border-secondary-400"/>
            </div>
        </div>
    </div>
  )
}

export default Empresa
