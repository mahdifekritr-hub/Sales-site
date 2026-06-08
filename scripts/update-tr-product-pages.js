const fs = require('fs');
const path = require('path');

const trPath = path.join(__dirname, '..', 'messages', 'tr.json');
const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
const changes = [];

function set(obj, keyPath, value) {
  const keys = keyPath.split('.');
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (cur[keys[i]] === undefined) throw new Error('Missing path: ' + keys.slice(0, i + 1).join('.'));
    cur = cur[keys[i]];
  }
  const last = keys[keys.length - 1];
  const prev = cur[last];
  if (prev === value) return;
  changes.push({ key: keyPath, previous: prev, updated: value });
  cur[last] = value;
}

// Real Estate Software page
set(tr, 'hero.titleLine1', 'Mülk satışı için');
set(tr, 'hero.titleLine2', 'yapay zeka ekibiniz');
set(tr, 'hero.titleLine3', 'her zaman yanınızda.');
set(tr, 'hero.bookDemo', 'Demo Talep Edin');
set(tr, 'videoShowcase.sectionTitleHighlight', 'PropertyCareApp');
set(tr, 'videoShowcase.sectionTitleEnd', 'mülk yönetiminizi dönüştürüyor');
set(tr, 'solutions.sectionTitle', 'Modern mülk satışı için');
set(tr, 'solutions.sectionTitleHighlight', 'akıllı modüller');
set(tr, 'solutions.items.buyers.title', 'Birim Ayırma');
set(tr, 'solutions.items.buyers.tag', 'Alıcı Özelliği');
set(tr, 'solutions.items.visit.features.instantNotify', 'Anında bildirim — temsilci, ev sahibi ve güvenlik otomatik bilgilendirilir');
set(tr, 'aiMatching.propertyCareAI', 'PropertyCareApp Yapay Zeka');
set(tr, 'testimonials.sectionTitle', 'Tercih edilen');
set(tr, 'testimonials.sectionTitleHighlight', 'sektör liderleri');
set(tr, 'testimonials.subtitle', 'Mülk yönetimi profesyonellerinin PropertyCareApp hakkında ne söylediğini görün.');
set(tr, 'faq.subtitle', 'PropertyCareApp hakkında bilmeniz gereken her şey. Listede olmayan bir sorunuz mu var? Destek ekibimizle iletişime geçin.');

// Maintenance page
set(tr, 'maintenancePage.hero.titleLine1', 'Yeni Nesil');
set(tr, 'maintenancePage.hero.titleHighlight', 'PM SaaS');
set(tr, 'maintenancePage.hero.titleLine2', '');
set(tr, 'maintenancePage.hero.subtitle', 'Yapay zeka destekli platformumuz bina operasyonlarını dönüştürür — akıllı bakım otomasyonundan ekibinizin sınırsız ölçeklenmesini sağlayan veri odaklı içgörülere kadar.');
set(tr, 'maintenancePage.hero.bookDemo', 'Demo Talep Edin');
set(tr, 'maintenancePage.hero.keyFeatures', 'ENTEGRASYONLAR');
set(tr, 'maintenancePage.hero.badges.workOrders', 'Quick Books');
set(tr, 'maintenancePage.hero.badges.scheduling', 'Google Calendar');
set(tr, 'maintenancePage.hero.badges.checklists', 'Amazon Hub');
set(tr, 'maintenancePage.hero.badges.tracking', 'Zego');
set(tr, 'maintenancePage.hero.badges.automation', 'Expert Texting');
set(tr, 'maintenancePage.hero.badges.vendors', 'FCM');
set(tr, 'maintenancePage.hero.badges.reports', 'Google Analytics');
set(tr, 'maintenancePage.hero.badges.mobile', 'Stripe');

set(tr, 'maintenancePage.solutions.sectionTitle', 'Modern bakım yönetimi için');
set(tr, 'maintenancePage.solutions.sectionTitleHighlight', 'akıllı modüller');

set(tr, 'maintenancePage.solutions.items.workOrders.title', 'En Kapsamlı İş Emri Modülü');
set(tr, 'maintenancePage.solutions.items.workOrders.description', 'QR kod taramasından otomatik envanter takibine kadar PropertyCareApp İş Emri modülü her detayı kapsar — hiçbir şey gözden kaçmaz.');
set(tr, 'maintenancePage.solutions.items.workOrders.features.f1', '19 yapılandırılmış bölüm + her operasyonel ihtiyaç için özel alanlar');
set(tr, 'maintenancePage.solutions.items.workOrders.features.f2', 'Envanteri otomatik düşürün, tedarikçileri bilgilendirin ve çoklu depo stokunu yönetin');
set(tr, 'maintenancePage.solutions.items.workOrders.features.f3', 'Herhangi bir varlığın QR kodunu tarayarak anında iş emri oluşturun');
set(tr, 'maintenancePage.solutions.items.workOrders.features.f4', 'Ekibe, baş teknisyene veya birden fazla destek teknisyenine atayın');
set(tr, 'maintenancePage.solutions.items.workOrders.features.f5', 'Otomatik onay iş akışlarıyla gerçek zamanlı ilerleme takibi');

set(tr, 'maintenancePage.solutions.items.workRequests.tag', 'İş Akışı Otomasyonu');
set(tr, 'maintenancePage.solutions.items.workRequests.title', 'İş Akışınız, Kurallarınız');
set(tr, 'maintenancePage.solutions.items.workRequests.description', "PropertyCareApp'in yerleşik İş Süreci Yönetimi sistemi, bakım iş akışınızın her adımı üzerinde tam kontrol sağlar — kimin neyi göreceğinden kimin ne zaman müdahale edeceğine kadar.");
set(tr, 'maintenancePage.solutions.items.workRequests.features.f1', 'Rol tabanlı erişim: hangi rollerin her durumu görüntüleyebileceğini, düzenleyebileceğini veya işlem yapabileceğini belirleyin');
set(tr, 'maintenancePage.solutions.items.workRequests.features.f2', '19 form bölümü için role ve duruma özel davranış — düzenlenebilir veya salt okunur');
set(tr, 'maintenancePage.solutions.items.workRequests.features.f3', 'Hangi rollerin durumları değiştirebileceğini ve hangi durumlara geçebileceğini tam olarak tanımlayın');
set(tr, 'maintenancePage.solutions.items.workRequests.features.f4', 'Ekibiniz genelinde tam şeffaflık için kapsamlı aktivite günlükleri');
set(tr, 'maintenancePage.solutions.items.workRequests.features.f5', 'Sorunsuz iş birliği için yerleşik yorumlar ve kullanıcı etiketleme');

set(tr, 'maintenancePage.solutions.items.workflowAutomation.tag', 'Rezervasyon Sistemi');
set(tr, 'maintenancePage.solutions.items.workflowAutomation.title', 'Sakinler Tesis Rezervasyonu Yapsın');
set(tr, 'maintenancePage.solutions.items.workflowAutomation.description', 'Sakinlere ortak alanları ve tesisleri sorunsuz şekilde rezerve etme imkanı sunun; kapasite, ödeme ve erişim kuralları üzerinde tam kontrol sağlayın.');
set(tr, 'maintenancePage.solutions.items.workflowAutomation.features.f1', 'Saatlik veya günlük rezervasyonlar için esnek planlama pencereleri');
set(tr, 'maintenancePage.solutions.items.workflowAutomation.features.f2', 'Eşzamanlı rezervasyon limitleri belirleyin; depozito, ön ödeme ve mahsuplaşmayı yönetin');
set(tr, 'maintenancePage.solutions.items.workflowAutomation.features.f3', 'Müsait olmayan slotları otomatik kontrol etmek için teknisyen takvimi entegrasyonu');
set(tr, 'maintenancePage.solutions.items.workflowAutomation.features.f4', 'Belirli sakin gruplarına erişimi kısıtlayın veya tesisleri sakinlerden gizleyin');
set(tr, 'maintenancePage.solutions.items.workflowAutomation.features.f5', 'Kalemler ve rezervasyon formlarında özel alanlar — her sürece uyarlanabilir');

set(tr, 'maintenancePage.solutions.items.timeCostTracking.tag', 'Yapay Zeka Asistanı');
set(tr, 'maintenancePage.solutions.items.timeCostTracking.title', 'Yapay Zeka Asistanınız — Her Zaman Hazır');
set(tr, 'maintenancePage.solutions.items.timeCostTracking.description', "PropertyCareApp'in yapay zeka asistanı tüm yönetim panelinize gömülüdür — sadece bir chatbot değil, operasyonlarınızı anlayan ve adınıza hareket eden akıllı bir ekip arkadaşıdır.");
set(tr, 'maintenancePage.solutions.items.timeCostTracking.features.f1', 'Öğe oluşturma, koordinasyon ve yönetim için tüm yönetim panelinde size yardımcı olur');
set(tr, 'maintenancePage.solutions.items.timeCostTracking.features.f2', 'İş akışı optimizasyonları önerir ve değişiklikleri doğrudan adınıza uygular');
set(tr, 'maintenancePage.solutions.items.timeCostTracking.features.f3', 'Her işlemden önce geçmişi ve devam eden konuşmaları özetler ve inceler');
set(tr, 'maintenancePage.solutions.items.timeCostTracking.features.f4', 'En iyi aksiyonu önerir ve bir ajan olarak otonom şekilde uygular');
set(tr, 'maintenancePage.solutions.items.timeCostTracking.features.f5', 'Sizin için yanıt taslağı hazırlar ve onayınızdan sonra kullanıcının kendi dilinde gönderir');

set(tr, 'maintenancePage.aiMatching.sectionTitleHighlight', 'Bakım Asistanınız');
set(tr, 'maintenancePage.aiMatching.subtitle', 'Her zaman aktif yapay zeka asistanınızla tanışın. Sadece öneri sunmaz — bağlamı okur, operasyonlarınızı anlar ve tüm platform genelinde işleri halleder.');
set(tr, 'maintenancePage.testimonials.subtitle', 'Tesis yöneticilerinin ve bakım profesyonellerinin PropertyCareApp hakkında ne söylediğini görün.');
set(tr, 'maintenancePage.testimonials.items.t1.quote', "PropertyCareApp'in bakım modülünü uyguladığımızdan beri ekipman arıza süresini %40 azalttık. Sadece önleyici bakım planlaması bile acil onarım maliyetlerinde bize binlerce lira tasarruf sağladı.");

// Assets page
set(tr, 'assetsPage.hero.titleLine1', 'Yapay Zekaya Bırakın');
set(tr, 'assetsPage.hero.titleHighlight', 'Varlıklarınız ve Parçalarınız');
set(tr, 'assetsPage.hero.titleLine2', '');
set(tr, 'assetsPage.hero.bookDemo', 'Demo Talep Edin');
set(tr, 'assetsPage.hero.badges.mobile', 'Talepler');
set(tr, 'assetsPage.solutions.items.assetTracking.description', 'QR kodu tarayarak garanti bilgisi, yaklaşık değer ve her varlık için sorumlu personel gibi kapsamlı detaylara anında erişin.');
set(tr, 'assetsPage.solutions.items.assetTracking.features.f1', 'Varlıkları tanımlayın ve düzenleyin');
set(tr, 'assetsPage.solutions.items.locationManagement.tag', 'Envanter');
set(tr, 'assetsPage.solutions.items.locationManagement.description', 'Mülkleriniz, binalarınız, katlarınız ve odalarınız için hiyerarşik konum yapıları tanımlayın. Her konumdaki parçaları takip edin ve tüm ekipman ile envanter için net bir organizasyon yapısı koruyun.');
set(tr, 'assetsPage.solutions.items.locationManagement.features.f3', 'Parça-konum ataması');
set(tr, 'assetsPage.solutions.items.locationManagement.features.f5', 'Kolay parça taşıma takibi');
set(tr, 'assetsPage.testimonials.subtitle', 'Mülk yöneticilerinin ve envanter uzmanlarının PropertyCareApp hakkında ne söylediğini görün.');

// Communication page
set(tr, 'communicationPage.hero.titleLine1', 'Yapay Zeka Destekli');
set(tr, 'communicationPage.hero.titleHighlight', 'İletişim');
set(tr, 'communicationPage.hero.titleLine2', '');
set(tr, 'communicationPage.hero.bookDemo', 'Demo Talep Edin');

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2) + '\n', 'utf8');
fs.writeFileSync(path.join(__dirname, 'tr-product-changes.json'), JSON.stringify(changes, null, 2), 'utf8');
console.log('Total changes:', changes.length);
