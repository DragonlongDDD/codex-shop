<script setup>
import { computed, nextTick, ref } from 'vue';

const categories = [
  { id: 'all', label: '山野精选' },
  { id: 'fire', label: '炭火主菜' },
  { id: 'garden', label: '田园鲜蔬' },
  { id: 'sweet', label: '甜一点' },
];
const dishes = [
  { title: '炭烤谷饲牛排', price: 168, description: '炭火慢烤 / 迷迭香 / 当季时蔬', category: 'fire', tag: '山野招牌', image: 'photo-1546833999-b9f581a1996d', alt: '搭配时蔬的炭烤牛排' },
  { title: '香草烤春鸡', price: 98, description: '鲜嫩鸡肉 / 花园香草 / 柠檬', category: 'fire', tag: '人气之选', image: 'photo-1532550907401-a500c9a57435', alt: '香草与柠檬调味的烤鸡' },
  { title: '田园时蔬沙拉', price: 58, description: '当季鲜蔬 / 坚果 / 自制油醋汁', category: 'garden', tag: '当季鲜蔬', image: 'photo-1512621776951-a57141f2eefd', alt: '多彩的新鲜蔬菜沙拉' },
  { title: '莓果奶油蛋糕', price: 48, description: '时令莓果 / 轻盈奶油 / 松软蛋糕', category: 'sweet', tag: '留一点甜', image: 'photo-1464305795204-6f5bbfc7fb81', alt: '点缀莓果的奶油蛋糕' },
];
const selectedCategory = ref('all');
const tabButtons = ref([]);
const filteredDishes = computed(() => dishes.filter(dish => selectedCategory.value === 'all' || dish.category === selectedCategory.value));

async function navigateTabs(event, index) {
  const destinations = {
    ArrowRight: (index + 1) % categories.length,
    ArrowLeft: (index - 1 + categories.length) % categories.length,
    Home: 0,
    End: categories.length - 1,
  };
  if (!Object.hasOwn(destinations, event.key)) return;
  event.preventDefault();
  const nextIndex = destinations[event.key];
  selectedCategory.value = categories[nextIndex].id;
  await nextTick();
  tabButtons.value[nextIndex]?.focus();
}
</script>

<template>
  <section id="menu" class="menu-section section">
    <div class="section-heading">
      <div><div class="kicker">从田野到厨房</div><h2>这一季，刚刚好。</h2></div>
      <p>把季节放进盘子里，<br>每一次相聚，都有新鲜的期待。</p>
    </div>
    <div class="menu-toolbar">
      <div class="tabs" role="tablist" aria-label="菜品分类">
        <button
          v-for="(category, index) in categories"
          :id="`tab-${category.id}`"
          :key="category.id"
          :ref="element => tabButtons[index] = element"
          class="tab"
          :class="{ selected: selectedCategory === category.id }"
          role="tab"
          :aria-selected="selectedCategory === category.id"
          aria-controls="dish-grid"
          :tabindex="selectedCategory === category.id ? 0 : -1"
          @click="selectedCategory = category.id"
          @keydown="navigateTabs($event, index)"
        >{{ category.label }}</button>
      </div>
      <span class="menu-note">随季节更替 · 每日限量制作</span>
    </div>
    <div id="dish-grid" class="dish-grid" role="tabpanel" :aria-labelledby="`tab-${selectedCategory}`" aria-live="polite" tabindex="0">
      <article v-for="dish in filteredDishes" :key="dish.title" class="dish">
        <div class="dish-photo">
          <img :src="`https://images.unsplash.com/${dish.image}?auto=format&fit=crop&w=700&q=80`" :alt="dish.alt" loading="lazy">
          <span class="dish-tag">{{ dish.tag }}</span>
        </div>
        <div class="dish-title"><h3>{{ dish.title }}</h3><span class="dish-price">¥ {{ dish.price }}</span></div>
        <p class="dish-description">{{ dish.description }}</p>
      </article>
    </div>
    <p class="menu-footnote">每一份好味道都值得等待。如有食物过敏，请在用餐前告知我们。</p>
  </section>
</template>
