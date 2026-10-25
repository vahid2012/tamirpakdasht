import type { ApplianceService } from './services';
import type { RoadsideService } from './roadside';
import type { Location } from './locations';

export interface ServiceCityContent {
  snippet: string;
  body: string;
  citySpecific: string;
  neighborhoods: string;
  routeInfo: string;
  faq: Array<{ q: string; a: string }>;
}

export function generateApplianceContent(service: ApplianceService, location: Location): ServiceCityContent {
  const cityName = location.name;
  const serviceName = service.persianName;

  const snippet = `${serviceName} در ${cityName} با تیم تکنسین‌های مجرب و قطعات اصل شرکتی، در تمام محلات از جمله ${location.neighborhoods.slice(0, 3).join('، ')} انجام می‌شود. خدمات ۲۴ ساعته با گارانتی کتبی و عیب‌یابی رایگان در محل شما.`;

  const neighborhoods = location.neighborhoods.map((n) => n).join('، ');

  const citySpecific = `
خرابی ناگهانی ${service.persianName === 'تعمیر یخچال' ? 'یخچال' : service.persianName === 'تعمیر لباسشویی' ? 'ماشین لباسشویی' : service.persianName === 'تعمیر کولر گازی' ? 'کولر گازی' : service.persianName === 'تعمیر پکیج' ? 'پکیج' : 'اجاق گاز'} در شهر ${cityName} می‌تواند یک مشکل جدی برای هر خانواده‌ای باشد. شهر ${cityName} با محلات متعدد و پرجمعیت خود، نیازمند خدمات تعمیری سریع و قابل اعتماد است. مرکز تخصصی تعمیر پاکدشت با پوشش کامل تمام محلات ${cityName} از جمله ${location.neighborhoods.slice(0, 5).join('، ')} و سایر مناطق، آماده ارائه خدمات ${serviceName} در کوتاه‌ترین زمان است.

${location.routeInfo} این یعنی تیم تکنسین‌های ما می‌توانند در زمان کوتاهی به هر نقطه از ${cityName} برسند و مشکل دستگاه شما را رفع کنند. در محلات پرتراکم مانند ${location.neighborhoods[0]} و ${location.neighborhoods[1]}، تکنسین‌های ما با آشنایی کامل از مسیرهای دسترسی، حتی در ساعات اوج ترافیک نیز به موقع به محل شما می‌رسند.

ساکنان ${cityName} می‌توانند برای ${serviceName} در تمام برندهای ${service.brands.slice(0, 4).join('، ')} و سایر برندها با ما تماس بگیرند. تکنسین‌های ما با تجهیزات عیب‌یاب تخصصی به محل شما اعزام می‌شوند و پس از شناسایی مشکل، هزینه شفاف را اعلام می‌کنند. تعمیر تنها با تأیید شما انجام می‌شود و در پایان گارانتی کتبی به شما تحویل داده می‌شود.

مشکلات شایعی که ساکنان ${cityName} با آن مواجه می‌شوند شامل ${service.commonIssues.slice(0, 3).join('، ')} و سایر خرابی‌های فنی است. این مشکلات می‌توانند به دلایل مختلفی از جمله فرسودگی قطعات، نوسانات برق منطقه، و استفاده نامناسب از دستگاه رخ دهند. تکنسین‌های ما با تجربه تعمیر صدها دستگاه در ${cityName} و شهرهای اطراف، به سرعت علت خرابی را شناسایی می‌کنند.

هزینه ${serviceName} در ${cityName} بسته به نوع خرابی و قطعه مصرفی متفاوت است. ما بر اساس شفافیت کامل عمل می‌کنیم و پیش از شروع تعمیر، هزینه دقیق را به شما اعلام می‌کنیم. تمام قطعات استفاده شده اصل و شرکتی هستند و شامل گارانتی از ۶ ماه تا ۱۲ ماه می‌شوند. مدیریت مجموعه بر عهده آقای خسروبیگی است که نظارت مستقیم بر کیفیت خدمات در ${cityName} دارد.

برای درخواست ${serviceName} در ${cityName}، کافی است با شماره ۰۹۰۳۲۴۸۶۰۷۳ تماس بگیرید. مشکل شما ثبت شده و نزدیک‌ترین تکنسین به محل شما در ${cityName} اعزام می‌شود. خدمات اضطراری ۲۴ ساعته در تمام ساعات شبانه‌روز و در تمام ایام سال ارائه می‌شود.
`.trim();

  const body = `${service.longContent}\n\n${citySpecific}`;

  const faq = [
    ...service.faq.slice(0, 3),
    { q: `${serviceName} در ${cityName} چقدر طول می‌کشد؟`, a: `در شهر ${cityName}، میانگین زمان رسیدن تکنسین ${location.routeInfo.includes('۲۰ تا ۳۰') ? '۲۰ تا ۳۰ دقیقه' : location.routeInfo.includes('۲۵ تا ۳۵') ? '۲۵ تا ۳۵ دقیقه' : '۳۰ تا ۴۰ دقیقه'} است و تعمیر در اکثر موارد در همان روز انجام می‌شود.` },
    { q: `${serviceName} در کدام محلات ${cityName} ارائه می‌شود؟`, a: `خدمات ${serviceName} در تمام محلات ${cityName} از جمله ${location.neighborhoods.slice(0, 4).join('، ')} و سایر مناطق ارائه می‌شود.` },
  ];

  return { snippet, body, citySpecific, neighborhoods, routeInfo: location.routeInfo, faq };
}

export function generateRoadsideContent(service: RoadsideService, location: Location): ServiceCityContent {
  const cityName = location.name;
  const serviceName = service.persianName;

  const snippet = `${serviceName} در ${cityName} با مجوز رسمی از کانون جهانگردی و اتومبیلرانی و مدیریت آقای خسروبیگی. خدمات ۲۴ ساعته در تمام محلات ${cityName}. تماس فوری: ۰۹۰۳۲۴۸۶۰۷۳.`;

  const neighborhoods = location.neighborhoods.map((n) => n).join('، ');

  const citySpecific = `
خدمات ${serviceName} در شهر ${cityName} با پوشش کامل تمام محلات و جاده‌های اطراف ارائه می‌شود. ${location.description} تیم امداد خودرو ما با آشنایی کامل از مسیرها و محلات ${cityName}، در کوتاه‌ترین زمان به محل شما اعزام می‌شود.

${location.routeInfo} این یعنی چه در جاده‌های اصلی و چه در محلات داخلی ${cityName} مانند ${location.neighborhoods.slice(0, 5).join('، ')}، تیم ما می‌تواند به سرعت به شما برسد.

در صورت خرابی خودرو در ${cityName}، با شماره ۰۹۰۳۲۴۸۶۰۷۳ تماس بگیرید. ${service.trustSignals.join('، ')}. هزینه خدمات شفاف و منصفانه است و پیش از اعزام به شما اعلام می‌شود.

ساکنان ${cityName} می‌توانند در تمام ساعات شبانه‌روز و در تمام ایام سال روی خدمات ${serviceName} ما حساب کنند. چه در ساعات اوج ترافیک، چه در شب‌هنگام و چه در روزهای تعطیل، تیم ما آماده اعزام است. مدیریت مجموعه بر عهده آقای خسروبیگی است که با نظارت مستقیم بر کیفیت خدمات در ${cityName}، رضایت کامل شما را تضمین می‌کند.
`.trim();

  const body = `${service.longContent}\n\n${citySpecific}`;

  const faq = [
    ...service.faq.slice(0, 3),
    { q: `${serviceName} در ${cityName} چقدر طول می‌کشد؟`, a: `در شهر ${cityName}، میانگین زمان رسیدن تیم بین ۱۵ تا ۳۰ دقیقه است و خدمات ۲۴ ساعته ارائه می‌شود.` },
  ];

  return { snippet, body, citySpecific, neighborhoods, routeInfo: location.routeInfo, faq };
}

// For Tehran (roadside only — no Location object)
export function generateRoadsideTehranContent(service: RoadsideService): ServiceCityContent {
  const cityName = 'تهران';
  const serviceName = service.persianName;

  const snippet = `${serviceName} در ${cityName} با مجوز رسمی از کانون جهانگردی و مدیریت آقای خسروبیگی. پوشش ۲۴ ساعته در تمام مناطق تهران. تماس فوری: ۰۹۰۳۲۴۸۶۰۷۳.`;

  const neighborhoods = 'مرکز تهران، شمال تهران، جنوب تهران، شرق تهران، غرب تهران، بزرگراه‌های امام علی، امام رضا، آزادگان، چمران، مدرس، همت';

  const citySpecific = `
خدمات ${serviceName} در شهر تهران با پوشش تمام مناطق شهر از مرکز تا حومه ارائه می‌شود. تهران به عنوان بزرگ‌ترین شهر ایران، نیازمند خدمات امداد خودرو سریع و قابل اعتماد است. تیم امداد خودرو ما با آشنایی کامل از بزرگراه‌ها و خیابان‌های اصلی تهران، در کوتاه‌ترین زمان به محل شما اعزام می‌شود.

پوشش خدمات ${serviceName} در تهران شامل تمام مناطق شهر از جمله مرکز تهران، شمال تهران، جنوب تهران، شرق و غرب تهران، و بزرگراه‌های اصلی مانند امام علی، امام رضا، آزادگان، چمران، مدرس و همت است. میانگین زمان رسیدن تیم در تهران بسته به منطقه و ترافیک بین ۲۰ تا ۴۵ دقیقه است.

در صورت خرابی خودرو در تهران، با شماره ۰۹۰۳۲۴۸۶۰۷۳ تماس بگیرید. ${service.trustSignals.join('، ')}. مدیریت مجموعه بر عهده آقای خسروبیگی است که نظارت مستقیم بر کیفیت خدمات در تهران دارد.

ترافیک سنگین تهران می‌تواند رسیدن به محل شما را چالش‌برانگیز کند، اما تیم ما با استفاده از موتورسیکلت‌های امدادی در موارد ضروری و آشنایی کامل با مسیرهای جایگزین، تلاش می‌کند تا در کوتاه‌ترین زمان به شما برسد. هزینه خدمات شفاف و منصفانه است و پیش از اعزام به شما اعلام می‌شود.
`.trim();

  const body = `${service.longContent}\n\n${citySpecific}`;

  const faq = [
    ...service.faq.slice(0, 3),
    { q: `${serviceName} در تهران چقدر طول می‌کشد؟`, a: `در تهران بسته به منطقه و ترافیک، میانگین زمان رسیدن تیم بین ۲۰ تا ۴۵ دقیقه است و خدمات ۲۴ ساعته ارائه می‌شود.` },
  ];

  return { snippet, body, citySpecific, neighborhoods, routeInfo: 'پوشش تمام مناطق تهران، میانگین زمان رسیدن ۲۰ تا ۴۵ دقیقه بسته به منطقه و ترافیک.', faq };
}
