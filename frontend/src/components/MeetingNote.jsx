import { useForm } from "../context/FormContext"
import { useEffect, useState } from "react"
import axios from "axios"
import Email from "./Email"

const API_URL = import.meta.env.VITE_API_URL

export function MeetingNote() {
    const { formData } = useForm()
    const [ meetingNotes, setMeetingNotes ]  = useState(
    <div class="">
        <h1 className="text-xl sm:text-xl font-bold text-gray-800 mb-6">
            Ata de Reunião: Otimização do Fluxo de Trabalho e Aceleração do Projeto Açaí
        </h1>

        <section className="objective mb-6">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-3">
                Objetivo
            </h2>
            <p className="text-gray-600 leading-relaxed">
                Definir os próximos passos para a otimização de um processo interno moroso, com foco na redução do tempo de execução e atendimento às demandas urgentes do projeto "Açaí". A meta é ter uma solução concreta e funcional implementada até o final de setembro, mitigando impactos na carga de trabalho.
            </p>
        </section>

        <section className="summary mb-6">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-3">
                Resumo dos Pontos Tratados
            </h2>
            <ul className="list-disc pl-5 space-y-3 text-gray-600">
                
                <li>
                    <strong className="font-semibold text-gray-700">Identificação do Problema:</strong> Foi reiterado que a morosidade do processo em questão é um problema recorrente, com histórico de reclamações de outros clientes, evidenciando a necessidade de uma solução estrutural.
                </li>
                
                <li>
                    <strong className="font-semibold text-gray-700">Urgência:</strong> A demanda pelo projeto "Açaí" intensificou a urgência na resolução, tornando a iniciativa de otimização uma prioridade.
                </li>
                
                <li>
                    <strong className="font-semibold text-gray-700">Meta e Prazo:</strong> A expectativa é que uma solução concreta e funcional para a otimização do processo esteja em operação até o final de setembro.
                </li>
                
                <li>
                    <strong className="font-semibold text-gray-700">Cronograma Inicial:</strong> Há uma previsão de que o desenvolvimento da solução possa ser iniciado já em agosto.
                </li>
                
            </ul>
        </section>
        <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-3">
                Próximos Passos e Responsabilidades
            </h2>
            <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>O interlocutor principal da reunião (responsável pela iniciativa) comprometeu-se a aprimorar o fluxo de trabalho atual.</li>
                    <li>O fluxo otimizado será compartilhado com o "Dono do Processo" (o outro participante da conversa) para revisão e validação.</li>
                    <li>Posteriormente, a equipe técnica será convocada para iniciar o desenvolvimento da solução.</li>
                    <li>O "Dono do Processo" será envolvido em reuniões técnicas futuras para fornecer sua expertise, validar o escopo do projeto e garantir que a solução atenda plenamente às necessidades do processo.</li>
                    <li>
                        <strong className="font-semibold text-gray-700">Colaboração:</strong> A importância da colaboração contínua do "Dono do Processo" foi destacada, dada sua experiência aprofundada no fluxo atual.
                    </li>
            </ul>
        </section>
    </div> 
    )
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        axios.post(`${API_URL}/home_azure`, {
            file_id: formData.fileId,
            model: formData.model,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            setMeetingNotes(res.data)
            console.log(res.data)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }, [])

    return (
        <div className="w-250 mt-6 mb-6 flex flex-col items-center gap-3">
            <h3 className="text-2xl text-[#494853] ">Transcript</h3>
            <p className="text-[#6F6C90] text-sm text-center">Here are the meeting trasnscription without the ATA model, 
                <br/>to create de notes, please submit the form
            </p>
            
            {loading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="loading loading-dots loading-xl text-primary"></span>
                    </div>
                ) : (
                    <Email notes={meetingNotes && meetingNotes}/>
                )
            }
            {/* <div className="w-[75%] h-92 border-1 border-gray-300 overflow-auto rounded p-8">
                {loading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="loading loading-dots loading-xl text-primary"></span>
                    </div>
                ) : (
                    <p className="break-words w-full text-base">
                        {meetingNotes && meetingNotes.response}
                    </p>
                )}
            </div>
            <div className="flex w-100 justify-evenly items-center">
                <button className="flex justify-start gap-3 items-center w-30 pl-6 py-2 border-2 border-gray-400 hover:border-[#4A3AFF] rounded-2xl text-xl cursor-pointer">
                    <Pencil size={20} className="text-[#4A3AFF]"/>
                    <p className="font-bold text-center text-lg">Edit</p>
                </button>
            </div> */}
        </div>
    )
}

export default MeetingNote