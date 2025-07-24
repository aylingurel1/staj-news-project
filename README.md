# Aylin News - Modern Haber Portal Uygulaması

Modern ve kullanıcı dostu bir haber portalı uygulaması. News API kullanarak güncel haberleri kategoriler halinde sunan, arama ve filtreleme özellikleri bulunan Next.js tabanlı bir web uygulaması.

## Proje Hakkında Detaylı Bilgi

Bu proje, kullanıcıların güncel haberlere kolay ve hızlı bir şekilde erişebilmesi amacıyla geliştirilmiştir. News API'sinden çekilen haberleri modern bir arayüzle sunar ve kullanıcılara kapsamlı haber okuma deneyimi sağlar. Responsive tasarımı sayesinde her cihazda mükemmel görünüm sunar.

## Özellikler (Features)

- ** Anasayfa Haber Akışı** - En güncel haberler ve editör seçimleri
- ** Kategori Bazlı Filtreleme** - İş, teknoloji, spor, sağlık, bilim, eğlence kategorileri
- ** Gelişmiş Arama Sistemi** - Haber başlığı, içerik ve açıklamada arama
- ** Responsive Tasarım** - Mobil, tablet ve desktop uyumlu
- ** Dinamik Haber Slider'ı** - Öne çıkan haberler için otomatik geçişli slider
- ** Sayfalama (Pagination)** - Çok sayıda haberi kolay gezinme
- ** Modern UI/UX** - Tailwind CSS ile şık ve kullanıcı dostu arayüz
- ** Hızlı Performans** - Next.js App Router ile optimize edilmiş
- ** Çoklu Dil Desteği** - Farklı dillerde haber içeriği
- ** Editor's Pick** - Editör tarafından seçilen özel haberler

## Kullanılan Teknolojiler (Tech Stack)

### **Frontend:**

- **Next.js 15.3.1** - React tabanlı full-stack framework
- **React 19** - UI kütüphanesi
- **TypeScript** - Tip güvenli JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Erişilebilir UI bileşenleri
- **Lucide React** - Modern icon seti
- **Swiper** - Touch slider bileşeni

### **API & Data:**

- **News API** - Haber verisi sağlayıcısı
- **Axios** - HTTP client

### **Geliştirme Araçları:**

- **ESLint** - Kod kalitesi ve standartları
- **PostCSS** - CSS işleme
- **Turbopack** - Hızlı bundling (dev mode)

## Kurulum (Installation)

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları takip edin:

1. **Projeyi klonlayın:**

   ```bash
   git clone https://github.com/aylingurel1/staj-news-project.git
   ```

2. **Proje dizinine gidin:**

   ```bash
   cd staj-news-project
   ```

3. **Bağımlılıkları yükleyin:**

   ```bash
   npm install
   ```

4. **Ortam değişkenlerini ayarlayın:**

   - `.env.local` dosyası oluşturun
   - Aşağıdaki değişkenleri ekleyin:

   ```env
   NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key_here
   NEXT_PUBLIC_NEWS_API_BASE_URL=https://newsapi.org/v2
   ```

   - [News API](https://newsapi.org/) sitesinden ücretsiz API anahtarı alabilirsiniz

5. **Geliştirme sunucusunu başlatın:**

   ```bash
   npm run dev
   ```

6. **Uygulamayı görüntüleyin:**
   Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin.

## Kullanım (Usage)

### Ana Özellikler:

- **Anasayfa:** `http://localhost:3000` - En güncel haberler ve slider
- **Kategori Sayfaları:** `http://localhost:3000/category/[kategori]` - Belirli kategorideki haberler
- **Arama:** `http://localhost:3000/search?q=[arama_terimi]` - Haber arama sonuçları

### Mevcut Kategoriler:

- Business (İş)
- Entertainment (Eğlence)
- General (Genel)
- Health (Sağlık)
- Science (Bilim)
- Sports (Spor)
- Technology (Teknoloji)

### API Kullanımı:

Proje News API'nin aşağıdaki endpoint'lerini kullanır:

- `GET /top-headlines` - En güncel haberler
- `GET /everything` - Gelişmiş arama ve filtreleme

## Proje Yapısı

```
staj-news-project/
├── public/                 # Statik dosyalar
├── src/
│   ├── app/               # Next.js App Router sayfaları
│   │   ├── category/      # Kategori sayfaları
│   │   ├── search/        # Arama sayfası
│   │   └── ...
│   ├── components/        # React bileşenleri
│   │   ├── layout/        # Layout bileşenleri
│   │   ├── news/          # Haber bileşenleri
│   │   ├── sections/      # Sayfa bölümleri
│   │   └── ui/            # UI bileşenleri
│   ├── lib/               # Yardımcı fonksiyonlar
│   └── types/             # TypeScript tip tanımları
├── package.json
└── README.md
```

## Katkıda Bulunma (Contributing)

Bu proje açık kaynak değildir, ancak geri bildirimleriniz ve önerileriniz her zaman memnuniyetle karşılanır. Eğer bir hata bulursanız veya yeni bir özellik öneriniz varsa, lütfen GitHub üzerinden issue açın.

### Geliştirme Süreci:

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans (License)

Bu proje MIT Lisansı ile lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakabilirsiniz.

## İletişim (Contact)

- **Geliştirici:** Aylin Gürel
- **GitHub:** [https://github.com/aylingurel1](https://github.com/aylingurel1)
- **LinkedIn:** [LinkedIn Profil Linkiniz]
- **E-posta:** [your.email@example.com]

---

## Ek Bilgiler

### Performans

- Next.js App Router ile server-side rendering
- Turbopack ile hızlı development build
- Optimized image loading
- Lazy loading için Suspense kullanımı

### Responsive Design

- Mobile-first yaklaşım
- Tablet ve desktop uyumluluğu
- Flexbox ve Grid layout kullanımı

### Accessibility

- Radix UI ile erişilebilir bileşenler
- Keyboard navigation desteği
- Screen reader uyumluluğu


