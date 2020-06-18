import React, { useEffect, useState } from "react"
import FormTitle from "../common/components/FormTitle"
import GlobalContent from "../common/components/GlobalContent"
import ImageUpload from "../common/components/ImageUpload"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { getPublicities, Publicity, getImageUrl } from "../publicity/publicityService"
import "../styles.css"

export default function Banner() {

    const [promotions, setPromotions] = useState<Publicity[]>([])

    const errorHandler = useErrorHandler()

    const loadPromotions = async () => {
        try {
            const result = await getPublicities(false)
            setPromotions(result)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    useEffect(() => {
        void loadPromotions()
        // eslint-disable-next-line
    }, [])

    return (
        <GlobalContent>
            <FormTitle>Publicidad</FormTitle>
            <table className="table">
                <tbody>
                    {promotions.map((promotion, i) => {
                        return (
                            <tr key={i}>
                                <a href={promotion.redirectLink} target="blank">
                                    <td className="text">
                                        <ImageUpload src={getImageUrl(promotion.imageId)}
                                            onChange={loadPromotions} />
                                    </td>
                                    <td>
                                        <tr>{promotion.title}</tr>
                                        <tr>{promotion.description}</tr>
                                    </td>
                                </a>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </GlobalContent>
    )
}
