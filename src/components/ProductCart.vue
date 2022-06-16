<template>
    <div class="productCart">
        <div class="desProductCart">
            <p>Burger</p>
            <p>Description : </p>
            <p class="descriptionProductCart">ztgfser, zgsfertzh, grezsfqtghz, agzesfaeg, gsg</p>
        </div>

        <div class="detailsProductCart">
            <img alt="image produit" src="../assets/buger.webp"/>
            <select class="quantite" id="qte" name="pets">
                <option value="">Quantité</option>
                <option value="dog">1</option>
                <option value="cat">2</option>
                <option value="hamster">3</option>
                <option value="parrot">4</option>
                <option value="spider">5</option>
            </select>
            <p class="price">23 €</p>
        </div>
    </div>


</template>

<script>
    export default {
        name: "ProductCart"
    }
</script>

<style lang="scss" scoped>
    .productCart {
        display: flex;
        justify-content: space-between;
        width: 100%;

        .desProductCart {
            p {
                text-align: left;
                padding: 10px 0;
            }

            .descriptionProductCart {
                width: 50px;
            }
        }

        .detailsProductCart {
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            select {
                text-align: right;
                border: none;
                background-color: #FFF;
            }

            p {
                text-align: right;
            }
        }
    }
</style>
