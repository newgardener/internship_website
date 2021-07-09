<?php
include '../shared/not-home-header.html';
include '../../assets/php/php-lib.php';

?>
  <!-- 모든 기사가 차례대로 display 되도록 -->
  <section class="banner inner_banner solution_idcard_ocr">
    <div class="banner_image">
      <img src="<?=__IMG_DIR__?>/sub_bn_06.png" alt="" />
      <img src="<?=__IMG_DIR__?>/test-mobile.png" alt="" />
    </div>
    <div class="container py-lg-2">
      <div class="row">
        <div class="col-lg-7 col-xl-5 text-center text-lg-left pt-0 pb-5 pt-md-5">
          <div class="banner_content wow fadeInDown">
            <h1>회사소개</h1>
          </div>
          <div class="w-100"></div>
        </div>
      </div>
    </div>
  </section>

  <section id="news_media" class="news_media">
    <div class="container">
      <div class="section_heading w-100 wow fadeInUpBig text-center">
        <h3>News & Media</h3>
      </div>
      <div class="row">
        <?php
          $total_news = total_count('media');
          $news_per_page = 6;
          $total_page = ceil($total_news / $news_per_page);

          if (isset($_GET["page"])) {
              $curr_page = $_GET["page"];
          } else {
              $curr_page = 1;
          }
          $start_from = ($curr_page-1) * $news_per_page;
          $sql = "SELECT * FROM media ORDER BY id DESC LIMIT $start_from, $news_per_page";
          $result = Query($sql);

          while ($row = Fetch($result)) {
              $filtered = array(
                  'title' => $row['title'],
                  'source' => $row['source'],
                  'date' => $row['date'],
                  'img_id' => $row['img_id'],
              );
              $news_id = $row['id'];
        ?>
          <div class="col-lg-6">
            <div class="news wow fadeInRight">
              <div class="image_wrapper" onClick="location.href='https://new.useb.co.kr/app/company/newspage.php?id=<?= $news_id ?>'">
                <canvas class="thumbnail" id="<?= $news_id ?>" style="background-image: url('https://webadmin.useb.co.kr/assets/uploaded/news/<?= $filtered['img_id'] ?>')"></canvas>
              </div>
              <div class="news_shot_des">
                <h4><a href="https://new.useb.co.kr/app/company/newspage.php?id=<?= $news_id ?>" id="news-title"><?= $filtered['title'] ?></a></h4>
                <a href="javascript:void(0);"><?= $filtered['source'] ?> | 보도자료</a>
                <span><?= $filtered['date'] ?></span>
              </div>
            </div>
          </div>
        <?php
          }
        ?>
      </div>
      <?php
      if ($total_news > 0) {
        include '../../assets/php/support-pagination-long.php';
      }
      ?>
    </div>
  </section>
</body>
<?php
  include '../shared/footer.html';
?>
