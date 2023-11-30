import type {NFT as NFTType } from "@thirdweb-dev/sdk";
import { SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import React from "react";
import NftCard from "./nftCard";
import Link from "next/link";
import { nft_drop } from "./constant";

type Props = {
    isLoading: boolean;
    data: NFTType[] | undefined;
    overrideOnclickBehavior?: (nft: NFTType) => void;
    emptyText?: string;
};

export default function NFTGrid({
    isLoading,
    data,
    overrideOnclickBehavior,
    emptyText = "No NFTs found",
}: Props) {
    
    return (
        <SimpleGrid columns={4} spacing={6} w={"100%"} padding={2.5} my={5}>
            {isLoading ? (
                [...Array(20)].map((_, index) => (
                    <Skeleton key={index} height={"312px"} width={"100%"} />
                ))
            ) : data && data.length > 0 ? (
                data.map((nft,index) => 
                    !overrideOnclickBehavior ? (
    
                        <NftCard key={index} nft={nft} />
                   
                    ) : (
                        <div
                            key={nft.metadata.id}
                            onClick={() => overrideOnclickBehavior(nft)}
                        >
                            <NftCard nft={nft} />
                        </div>
                    ))
            ) : (
                <Text>{emptyText}</Text>
            )}
        </SimpleGrid>
        
    )
};