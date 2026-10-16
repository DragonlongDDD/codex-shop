<script setup>
import { ref } from 'vue';
import SeasonalMenu from './components/SeasonalMenu.vue';
import BookingDialog from './components/BookingDialog.vue';

const mobileNavOpen = ref(false);
const bookingDialog = ref(null);
const year = new Date().getFullYear();

function openBooking() {
  bookingDialog.value.open();
}
</script>

<template>
  <header class="header">
    <a class="brand" href="#" aria-label="山野首页"><span class="brand-mark">山野</span><span class="brand-type">SHANYE<small>炭火 · 时令 · 好好吃饭</small></span></a>
    <nav class="nav" aria-label="主导航"><a class="active" href="#home">首页</a><a href="#menu">时令菜单</a><a href="#story">关于山野</a><a href="#visit">来坐坐</a></nav>
    <button class="button small" @click="openBooking">预订一席 <span aria-hidden="true">↗</span></button>
    <button class="nav-toggle" :aria-label="mobileNavOpen ? '关闭导航' : '打开导航'" :aria-expanded="mobileNavOpen" aria-controls="mobile-nav" @click="mobileNavOpen = !mobileNavOpen">☰</button>
  </header>
  <nav id="mobile-nav" class="mobile-nav" aria-label="移动导航" :hidden="!mobileNavOpen"><a href="#menu" @click="mobileNavOpen = false">时令菜单</a><a href="#story" @click="mobileNavOpen = false">关于山野</a><a href="#visit" @click="mobileNavOpen = false">来坐坐</a></nav>
  <main>
    <section id="home" class="hero">
      <div class="hero-copy"><div class="season"><span></span> 秋日菜单，正在上桌</div><h1>把日子，<br>慢慢吃成<br>喜欢的样子。</h1><p>应季而食，循味而来。<br>在一蔬一饭之间，尝见山野的本真。</p><a class="button" href="#menu">看看这一季 <span aria-hidden="true">↗</span></a><div class="hero-note"><span class="little-branch" aria-hidden="true">❧</span><span>食材有时，风味有期。<br><small>Good food. A slower life.</small></span></div></div>
      <div class="hero-photo"><img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85" alt="炭火烤制的肉排，搭配香草与时蔬" fetchpriority="high"><div class="photo-shade"></div><div class="photo-top">从土地，到餐桌。</div><div class="photo-bottom"><div><span class="photo-label">山野招牌</span><h2>一口炭香，满是诚意。</h2><span>直火慢烤，让食材自己说话</span></div><a class="round-link" href="#menu" aria-label="探索招牌菜">↗</a></div><div class="photo-index"><span>01</span> / 这个季节的好味道</div></div>
    </section>
    <div class="values-strip"><span>好食材，不辜负</span><span class="strip-dot">✳</span><span>当季鲜味</span><span class="strip-dot">✳</span><span>炭火现做</span><span class="strip-dot">✳</span><span>留一点时间，好好吃饭</span></div>
    <SeasonalMenu />
    <section id="story" class="story section"><div class="story-photo"><img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85" alt="温暖的餐厅灯光与精心布置的餐桌" loading="lazy"><span class="image-caption">一张餐桌，盛下生活的热爱。</span></div><div class="story-copy"><div class="kicker">山野的日常</div><h2>在城市一隅，<br>留一席自然。</h2><p>我们喜欢山间的风、雨后的泥土，和厨房里升起的第一缕炭香。于是，把这些对自然的偏爱，带到了一张餐桌上。</p><p>不必赶时间，也无需盛装。和喜欢的人一起，吃一顿热气腾腾的饭，就是生活里很好的事情。</p><a href="#visit" class="text-link">来山野坐坐 <span aria-hidden="true">↗</span></a></div></section>
    <section id="visit" class="visit section"><div><div class="kicker">把时间留给相聚</div><h2>今天，好好吃一顿。</h2><p>午间小聚，或是夜晚举杯。<br>我们为每一个平凡的好日子留席。</p><button class="button" @click="openBooking">预订一席 <span aria-hidden="true">↗</span></button></div><div class="visit-details"><h3>山野 · 城市餐桌</h3><dl><div><dt>午餐</dt><dd>11:30 — 14:30</dd></div><div><dt>晚餐</dt><dd>17:30 — 21:30</dd></div><div><dt>门店</dt><dd>筹备中，敬请期待</dd></div></dl><p>这是一个餐馆网站演示，菜品与营业信息为示例。</p></div><span class="visit-art" aria-hidden="true">山<br>野</span></section>
  </main>
  <footer><a class="footer-brand" href="#home">山野 <span>SHANYE</span></a><p>山间有风，桌上有味。</p><span>© {{ year }} 山野 · 餐馆首页概念演示</span><a href="#home" aria-label="回到顶部">回到顶部 ↑</a></footer>
  <BookingDialog ref="bookingDialog" />
</template>
