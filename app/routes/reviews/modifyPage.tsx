import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getReview, getTags } from "~/api/reviews/reviewAPI";
import ModifyComponent from "~/components/reviews/modifyComponent";

function ModifyPage() {
    const { rid } = useParams()

    // 리뷰 정보 가져오기
    const { data } = useQuery({
        queryKey: ["review", Number(rid)],
        queryFn: () => getReview(Number(rid))
    });

    return (
        <div>
            <ModifyComponent review={data?.data}></ModifyComponent>
        </div>
    );
}

export default ModifyPage;