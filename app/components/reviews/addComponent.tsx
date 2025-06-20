import { useRef, useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { addReview } from "~/api/reviews/reviewAPI";
import { useNavigate } from "react-router-dom";
import type { ProductDetailDTO } from "~/types/products";
import { useTagSelector } from "~/hooks/tags/useTagSelector";
import { Rating } from "~/components/reviews/rating/rating"
import Swal from "sweetalert2"
import '~/util/customSwal.css'
import TextareaAutosize from "react-textarea-autosize";

interface AddProps {
    product?: ProductDetailDTO;
    isLoading: boolean;
    isError: boolean;
}

export default function AddComponent({ product, isLoading, isError }: AddProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const [score, setScore] = useState(0);
    const [images, setImages] = useState<File[]>([]);
    const navigate = useNavigate();

    // 무한 호출 방지용 useState
    const [initSelected] = useState<number[]>([]);

    // 선택된 태그들
    const {selectedTags, toggleTag, groupedTags} = useTagSelector(initSelected);

    // 리뷰 추가 뮤테이션
    const addMutation = useMutation({
        mutationFn: (formData: FormData) => addReview(formData)
    });

    // 이미지 처리
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const fileArray = Array.from(files);
        setImages(prev => [...prev, ...fileArray]);
    };

    // 이미지 삭제
    const removeImage = (idx: number) =>
        setImages(prev => prev.filter((_, i) => i !== idx));

    // 폼 제출
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // 1) 리뷰 데이터(JSON)만 객체로 추출
        const review: ReviewAddDTO = {
            productId: product!.productId,
            score: Number(formRef.current?.score.value),
            comment: formRef.current?.comment.value,
            tagIdList: selectedTags,
        };

        // 2) FormData 직접 생성
        const formData = new FormData();
        formData.append(
            "review",
            new Blob([JSON.stringify(review)], {type: "application/json"})
        );

        // 3) 이미지 파일들(files) append
        images.forEach(file => {
            formData.append("files", file);
        });

        // 4) 전송
        addMutation.mutate(formData);

        Swal.fire({
            title: "추가가 완료되었습니다",
            icon: "success",
            confirmButtonText: "확인",
            customClass: {
                popup: 'custom-popup',
                title: 'custom-title',
                actions: 'custom-actions',
                confirmButton: 'custom-confirm-button',
            }
        });
        navigate(`/reviews/product/${product?.barcode}`);
    };

    if (isLoading)
        return <p className="text-center p-4 text-base sm:text-lg">로딩 중입니다</p>;
    if (isError)
        return <p className="text-center p-4 text-red-500 text-base sm:text-lg">상품 정보를 불러오지 못했습니다</p>

    return (
        <section className="py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
                {/* 상품 이미지 + 정보 */}
                <div className="flex flex-col items-center mb-8">
                    <img
                        src={product?.imgUrl || "/example.jpg"}
                        alt={product?.name || "상품 이미지"}
                        className="w-40 h-40 sm:w-40 sm:h-40 md:w-40 md:h-40 rounded-lg object-cover mb-"
                    />
                    <p className="text-base sm:text-base md:text-md font-semibold text-gray-800 text-center">
                        {product?.name}
                    </p>
                </div>

                {/* 별점 선택 */}
                <div className="text-center mb-8">
                    <h3 className="font-manrope font-bold text-lg sm:text-xl text-gray-700 mb-4">
                        상품은 어떠셨나요?
                    </h3>
                    <div className="flex justify-center space-x-2">
                        {[1, 2, 3, 4, 5].map(i => (
                            <button
                                key={i}
                                onClick={() => setScore(i)}
                                className="transform transition hover:scale-110 focus:outline-none"
                                aria-label={`${i}점`}
                            >
                                <Rating filled={i <= score} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* 리뷰 폼 */}
                {score > 0 && (
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className="space-y-6"
                    >
                        <input type="hidden" name="score" value={score} />

                        {/* 코멘트 */}
                        <TextareaAutosize
                            name="comment"
                            minRows={6}
                            maxRows={15}
                            placeholder="솔직한 상품 리뷰를 남겨주세요"
                            className="w-full border text-gray-600 border-gray-300 rounded-md p-3 text-base sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />

                        {/* 태그 선택 */}
                        <div>
                            <p className="font-medium text-gray-700 mb-2 text-base sm:text-base">
                                태그 선택
                            </p>
                            <div className="space-y-4">
                                {Object.entries(groupedTags).map(([category, tagList]) => (
                                    <div key={category} className="w-full">
                                        {/* 카테고리 제목 */}
                                        <p className="text-sm sm:text-base font-semibold text-gray-600 mb-2">
                                            {category}
                                        </p>
                                        {/* 태그 버튼 리스트 */}
                                        <div className="flex overflow-x-auto no-scrollbar space-x-2 px-1 pb-1 -mx-1"
                                             style={{scrollbarWidth: "none", msOverflowStyle: "none"}}>
                                            {tagList.map(tag => (
                                                <button
                                                    key={tag.tagId}
                                                    type="button"
                                                    onClick={() => toggleTag(tag.tagId)}
                                                    className={`whitespace-nowrap px-3 py-1 text-sm sm:text-sm rounded-full border transition-colors
                                                        ${
                                                        selectedTags.includes(tag.tagId)
                                                            ? "bg-emerald-50 text-emerald-500 border-emerald-200"
                                                            : "bg-gray-100 text-gray-500 border-gray-400"
                                                    }`}
                                                >
                                                    {tag.tagName}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 이미지 업로드 & 미리보기 */}
                        <div>
                            <p className="text-base sm:text-base text-gray-700 mb-2">
                                사진 추가
                            </p>
                            {/* 파일 업로드 버튼 */}
                            <div className="w-full overflow-x-auto no-scrollbar flex space-x-2">
                                <label className="w-25 h-25 sm:w-25 sm:h-25 flex-shrink-0 flex items-center justify-center border-2 border-dashed rounded-md text-gray-400 cursor-pointer">
                                    <span className="text-2xl">＋</span>
                                    <input
                                        type="file"
                                        name="files"
                                        multiple
                                        accept="image/*"
                                        onChange={e => {
                                            handleImageChange(e);
                                        }}
                                        className="hidden"
                                    />
                                </label>
                                {images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="relative w-25 h-25 sm:w-25 sm:h-25 flex-shrink-0 rounded-md overflow-hidden border"
                                    >
                                        <img
                                            src={URL.createObjectURL(img)}
                                            alt={`preview-${idx}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                removeImage(idx);
                                                setImages(prev => prev.filter((_, i) => i !== idx));
                                            }}
                                            className="absolute top-1 right-1 bg-black/50 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 제출 버튼 */}
                        <button
                            type="submit"
                            disabled={addMutation.isPending}
                            className={`
                                w-full px-4 py-2 font-medium rounded-md text-sm sm:text-sm transition-colors
                                ${addMutation.isPending
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-emerald-400 text-white hover:bg-emerald-600"}
                            `}
                        >
                            {addMutation.isPending ? "등록 중..." : "리뷰 등록하기"}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}