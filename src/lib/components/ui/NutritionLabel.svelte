<script lang="ts">
    interface NutritionInfo {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
        fiber: number;
    }

    interface Props {
        nutrition: NutritionInfo;
    }

    let { nutrition }: Props = $props();
</script>

<div class="bg-white border-4 border-black p-4 max-w-xs mx-auto font-sans text-left text-black shadow-card transform rotate-1 hover:rotate-0 transition-transform duration-300">
    <h3 class="font-black text-3xl border-b-8 border-black leading-none pb-1">Nutrition Facts</h3>
    <p class="text-sm font-bold border-b border-black pb-1 mb-1">Serving Size: 1 Snack</p>
    
    <div class="flex justify-between items-end border-b-4 border-black pb-1">
        <div>
            <span class="font-bold text-sm block">Amount Per Serving</span>
            <span class="font-black text-2xl">Calories</span>
        </div>
        <span class="font-black text-4xl">{nutrition.calories}</span>
    </div>

    <div class="text-sm pt-1">
        <div class="flex justify-between border-b border-gray-300 py-1">
            <span class="font-bold">Total Fat <span class="font-normal">{nutrition.fat}g</span></span>
            <span class="font-bold">{Math.round((nutrition.fat / 65) * 100)}%</span>
        </div>
        <div class="flex justify-between border-b border-gray-300 py-1">
            <span class="font-bold">Total Carbohydrate <span class="font-normal">{nutrition.carbs}g</span></span>
            <span class="font-bold">{Math.round((nutrition.carbs / 300) * 100)}%</span>
        </div>
        <div class="flex justify-between border-b border-gray-300 py-1 pl-4">
            <span>Dietary Fiber {nutrition.fiber}g</span>
            <span class="font-bold">{Math.round((nutrition.fiber / 25) * 100)}%</span>
        </div>
        <div class="flex justify-between border-b-4 border-black py-1">
            <span class="font-bold">Protein <span class="font-normal">{nutrition.protein}g</span></span>
        </div>
    </div>
    <div class="text-[10px] leading-tight pt-2">
        *Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.
    </div>
</div>
