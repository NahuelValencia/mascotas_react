import React, { useEffect, useState } from "react"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { goHome } from "../common/utils/Tools"
import "../styles.css"
import { deletePromotion, getImageUrl, Publicity, getPublicities } from "./publicityService"
import FormButtonBar from "../common/components/FormButtonBar"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormTitle from "../common/components/FormTitle"
import GlobalContent from "../common/components/GlobalContent"
import { RouteComponentProps } from "react-router-dom"
import ImageUpload from "../common/components/ImageUpload"

export default function Publicities(props: RouteComponentProps) {
    const [promotions, setPromotions] = useState<Publicity[]>([])

    const errorHandler = useErrorHandler()

    const loadOwnPublicities = async () => {
        try {
            const result = await getPublicities(true)
            setPromotions(result)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const newPublicityClick = () => {
        props.history.push("/newPromotion")
    }

    const editPublicityClick = (publicityId: string) => {
        props.history.push("/editPromotion/" + publicityId)
    }

    const deletePublicityClick = async (promotionId: string) => {
        try {
            await deletePromotion(promotionId)
            props.history.push("/promotions")
            window.location.reload(false)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    useEffect(() => {
        void loadOwnPublicities()
        // eslint-disable-next-line
    }, [])

    return (
        <GlobalContent>
            <FormTitle>Mis publicidades</FormTitle>
            <table className="table">
                <tbody>
                    {promotions.map((promotion, i) => {
                        return (
                            <tr key={i}>

                                <td className="text">
                                    <ImageUpload src={getImageUrl(promotion.imageId)}
                                        onChange={loadOwnPublicities} />
                                </td>
                                <a href={promotion.redirectLink} target="blank">
                                    <td>
                                        <tr>{promotion.title}</tr>
                                        <tr>{promotion.description}</tr>
                                    </td>
                                </a>
                                <td className="text">
                                    <img
                                        src="/assets/edit.png"
                                        alt=""
                                        onClick={() => editPublicityClick(promotion.id)} />
                                </td>
                                <td className="text">
                                    <img
                                        src="/assets/disable.png"
                                        alt=""
                                        onClick={() => deletePublicityClick(promotion.id)} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <FormButtonBar>
                <FormAcceptButton label="Nueva Publicidad" onClick={newPublicityClick} />
                <FormButton label="Cancelar" onClick={() => goHome(props)} />
            </FormButtonBar>
        </GlobalContent>
    )
}
